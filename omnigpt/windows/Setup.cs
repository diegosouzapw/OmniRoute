// OmniGPT installer: one exe with the built program inside (payload.zip resource). Installs for the current user only
// (no administrator rights), adds Start menu and optional desktop shortcuts, and registers an uninstaller in
// Settings > Apps. Run with /S to install silently. Written for the C# 5 compiler that ships with Windows.
using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Win32;

static class Setup
{
    public const string Version = "1.0.1";
    public static readonly string Dest = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "OmniGPT");
    const string UninstallKey = @"Software\Microsoft\Windows\CurrentVersion\Uninstall\OmniGPT";

    [STAThread]
    static int Main(string[] args)
    {
        bool silent = Array.Exists(args, a => a.Equals("/S", StringComparison.OrdinalIgnoreCase));
        if (silent)
        {
            try { Install(true, false, null); return 0; }
            catch (Exception e)
            {   // a windowed program has no console: leave the reason where it can be read
                try { File.WriteAllText(Path.Combine(Path.GetTempPath(), "OmniGPT-Setup.log"), e.ToString()); } catch (Exception) { }
                return 1;
            }
        }
        Application.EnableVisualStyles();
        Application.Run(new SetupForm());
        return 0;
    }

    public static bool WebView2Installed()
    {
        string id = "{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}";
        foreach (string k in new[] { @"HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\" + id, @"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\EdgeUpdate\Clients\" + id, @"HKEY_CURRENT_USER\Software\Microsoft\EdgeUpdate\Clients\" + id })
        {
            object v = Registry.GetValue(k, "pv", null);
            if (v is string && (string)v != "" && (string)v != "0.0.0.0") return true;
        }
        return false;
    }

    public static bool OmniRouteInstalled()
    {
        string npm = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "npm", "node_modules", "omniroute", "bin", "omniroute.mjs");
        return File.Exists(npm);
    }

    static void CloseRunning()
    {
        foreach (Process p in Process.GetProcessesByName("OmniGPT"))
        {
            try { p.CloseMainWindow(); if (!p.WaitForExit(8000)) p.Kill(); } catch (Exception) { }
        }
        foreach (Process p in Process.GetProcessesByName("node"))
        {   // the backend of a running copy, started from the install folder
            try { if (p.MainModule.FileName.StartsWith(Dest, StringComparison.OrdinalIgnoreCase)) p.Kill(); } catch (Exception) { }
        }
    }

    static void Shortcut(string lnk, string target)
    {
        Type t = Type.GetTypeFromProgID("WScript.Shell");
        object shell = Activator.CreateInstance(t);
        object s = t.InvokeMember("CreateShortcut", BindingFlags.InvokeMethod, null, shell, new object[] { lnk });
        Type st = s.GetType();
        st.InvokeMember("TargetPath", BindingFlags.SetProperty, null, s, new object[] { target });
        st.InvokeMember("WorkingDirectory", BindingFlags.SetProperty, null, s, new object[] { Path.GetDirectoryName(target) });
        st.InvokeMember("IconLocation", BindingFlags.SetProperty, null, s, new object[] { target + ",0" });
        st.InvokeMember("Description", BindingFlags.SetProperty, null, s, new object[] { "OmniGPT" });
        st.InvokeMember("Save", BindingFlags.InvokeMethod, null, s, null);
    }

    public static void Install(bool desktop, bool launch, Action<int, string> progress)
    {
        Action<int, string> say = progress ?? delegate { };
        say(5, "Closing OmniGPT if it is running...");
        CloseRunning();
        say(15, "Removing the previous version...");
        Directory.CreateDirectory(Dest);
        foreach (string d in new[] { "app", "runtime", "sandbox" })
        {
            string p = Path.Combine(Dest, d);
            if (Directory.Exists(p)) Directory.Delete(p, true);
        }
        say(25, "Copying files...");
        using (Stream s = Assembly.GetExecutingAssembly().GetManifestResourceStream("payload.zip"))
        using (ZipArchive zip = new ZipArchive(s, ZipArchiveMode.Read))
        {
            int n = 0, total = zip.Entries.Count;
            foreach (ZipArchiveEntry e in zip.Entries)
            {
                string name = e.FullName.Replace('\\', '/'); // .NET Framework writes folder entries with backslashes
                string target = Path.GetFullPath(Path.Combine(Dest, name));
                if (!target.StartsWith(Dest + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase)) continue; // never write outside the install folder
                if (name.EndsWith("/") || e.Name == "") { Directory.CreateDirectory(target); continue; }
                Directory.CreateDirectory(Path.GetDirectoryName(target));
                e.ExtractToFile(target, true);
                if (++n % 200 == 0) say(25 + 60 * n / total, "Copying files... " + n + " of " + total);
            }
        }
        say(88, "Creating shortcuts...");
        string exe = Path.Combine(Dest, "OmniGPT.exe");
        string menu = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Programs), "OmniGPT.lnk");
        Shortcut(menu, exe);
        string desk = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "OmniGPT.lnk");
        if (desktop) Shortcut(desk, exe);
        string un = Path.Combine(Dest, "Uninstall OmniGPT.cmd");
        File.WriteAllText(un,
            "@echo off\r\n" +
            "rem Removes the OmniGPT program, its shortcuts and its entry in Settings > Apps. Your chats and settings\r\n" +
            "rem (%LOCALAPPDATA%\\OmniRouteChat and %LOCALAPPDATA%\\OmniGPT) and OmniRoute itself are kept.\r\n" +
            "taskkill /im OmniGPT.exe /f >nul 2>&1\r\n" +
            "del \"" + menu + "\" >nul 2>&1\r\n" +
            "del \"" + desk + "\" >nul 2>&1\r\n" +
            "reg delete \"HKCU\\" + UninstallKey + "\" /f >nul 2>&1\r\n" +
            "start \"\" /min cmd /c \"ping -n 3 127.0.0.1 >nul & rmdir /s /q \"\"%~dp0\"\"\"\r\n" +
            "echo OmniGPT removed.\r\n");
        say(94, "Registering...");
        using (RegistryKey k = Registry.CurrentUser.CreateSubKey(UninstallKey))
        {
            k.SetValue("DisplayName", "OmniGPT");
            k.SetValue("DisplayVersion", Version);
            k.SetValue("Publisher", "OmniGPT");
            k.SetValue("DisplayIcon", exe + ",0");
            k.SetValue("InstallLocation", Dest);
            k.SetValue("UninstallString", "cmd.exe /c \"" + un + "\"");
            k.SetValue("NoModify", 1, RegistryValueKind.DWord);
            k.SetValue("NoRepair", 1, RegistryValueKind.DWord);
            long size = 0; foreach (string f in Directory.GetFiles(Dest, "*", SearchOption.AllDirectories)) size += new FileInfo(f).Length;
            k.SetValue("EstimatedSize", (int)(size / 1024), RegistryValueKind.DWord);
        }
        say(100, "Done.");
        if (launch) Process.Start(exe);
    }
}

class SetupForm : Form
{
    readonly Label text = new Label();
    readonly CheckBox desktop = new CheckBox();
    readonly CheckBox launch = new CheckBox();
    readonly ProgressBar bar = new ProgressBar();
    readonly Button go = new Button();
    readonly Button cancel = new Button();

    public SetupForm()
    {
        Text = "Install OmniGPT " + Setup.Version;
        Font = new Font("Segoe UI", 9.5f);
        ClientSize = new Size(500, 270);
        FormBorderStyle = FormBorderStyle.FixedDialog;
        MaximizeBox = false; MinimizeBox = false;
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(244, 244, 243);
        try { Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath); } catch (Exception) { }

        Label title = new Label { Text = "OmniGPT", Font = new Font("Segoe UI Semibold", 16f), Location = new Point(24, 18), AutoSize = true };
        text.Location = new Point(26, 58); text.Size = new Size(450, 80);
        text.Text = "OmniGPT will be installed for your Windows account in:\r\n" + Setup.Dest +
            "\r\n\r\nNo administrator rights are needed. Your chats and settings are kept when you update.";
        if (!Setup.WebView2Installed()) text.Text += "\r\n\r\nNote: the Microsoft Edge WebView2 Runtime was not found. Install it from microsoft.com before starting OmniGPT.";
        desktop.Text = "Create a desktop shortcut"; desktop.Checked = true; desktop.Location = new Point(28, 148); desktop.AutoSize = true;
        launch.Text = "Start OmniGPT when finished"; launch.Checked = true; launch.Location = new Point(28, 174); launch.AutoSize = true;
        bar.Location = new Point(28, 206); bar.Size = new Size(444, 8); bar.Visible = false;
        go.Text = "Install"; go.Size = new Size(96, 30); go.Location = new Point(276, 226);
        cancel.Text = "Cancel"; cancel.Size = new Size(96, 30); cancel.Location = new Point(376, 226);
        go.Click += OnInstall; cancel.Click += delegate { Close(); };
        AcceptButton = go; CancelButton = cancel;
        Controls.AddRange(new Control[] { title, text, desktop, launch, bar, go, cancel });
    }

    async void OnInstall(object sender, EventArgs e)
    {
        go.Enabled = false; cancel.Enabled = false; desktop.Enabled = false; launch.Enabled = false; bar.Visible = true;
        bool d = desktop.Checked, l = launch.Checked;
        Action<int, string> progress = delegate(int pct, string msg) { BeginInvoke((Action)delegate { bar.Value = Math.Min(100, pct); text.Text = msg; }); };
        try
        {
            await Task.Run(delegate { Setup.Install(d, false, progress); });
            text.Text = "OmniGPT " + Setup.Version + " is installed.";
            if (!Setup.OmniRouteInstalled())
                text.Text += "\r\n\r\nOmniRoute is not installed yet. OmniGPT needs it: install Node.js, then run\r\n    npm install -g omniroute\r\nThe setup guide on GitHub explains every step.";
            if (l) Process.Start(Path.Combine(Setup.Dest, "OmniGPT.exe"));
            cancel.Text = "Close"; cancel.Enabled = true; go.Visible = false; AcceptButton = cancel;
        }
        catch (Exception ex)
        {
            text.Text = "Installation failed:\r\n" + ex.Message;
            cancel.Text = "Close"; cancel.Enabled = true;
        }
    }
}
