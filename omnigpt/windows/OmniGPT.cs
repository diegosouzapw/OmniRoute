// OmniGPT desktop shell: one native window hosting the UI (WebView2). It starts the Node backend (and, through it,
// OmniRoute) completely hidden, and stops them when the window closes. Written for the C# 5 compiler in Windows.
using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using Microsoft.Win32;

static class Native
{
    [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
    [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern IntPtr FindWindow(string cls, string title);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);
    [DllImport("dwmapi.dll")] public static extern int DwmSetWindowAttribute(IntPtr h, int attr, ref int val, int size);
}

static class Program
{
    [STAThread]
    static void Main()
    {
        bool created;
        Mutex single = new Mutex(true, "Local\\OmniGPT.SingleInstance", out created);
        if (!created)
        {   // already running: bring that window forward instead of opening a second copy
            IntPtr h = Native.FindWindow(null, "OmniGPT");
            if (h != IntPtr.Zero) { Native.ShowWindow(h, 9); Native.SetForegroundWindow(h); }
            return;
        }
        Native.SetProcessDPIAware();
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new MainForm());
        GC.KeepAlive(single);
    }
}

class MainForm : Form
{
    const string Url = "http://127.0.0.1:20129/";
    readonly WebView2 wv = new WebView2();
    readonly Label status = new Label();
    readonly string root = AppDomain.CurrentDomain.BaseDirectory;
    readonly string dataDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "OmniGPT");
    Process server;
    StreamWriter log;
    CoreWebView2Environment env;
    WebView2 console; // the OmniRoute dashboard, shown inside this window
    Color bg;
    static readonly string OmniRouteUrl = (Environment.GetEnvironmentVariable("OMNIROUTE_URL") ?? "http://127.0.0.1:20128").TrimEnd('/');

    static bool Dark()
    {
        try
        {
            object v = Registry.GetValue(@"HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize", "AppsUseLightTheme", 1);
            return v is int && (int)v == 0;
        }
        catch (Exception) { return true; }
    }

    public MainForm()
    {
        bool dark = Dark();
        bg = dark ? Color.FromArgb(26, 26, 26) : Color.FromArgb(244, 244, 243);
        Text = "OmniGPT";
        BackColor = bg;
        ClientSize = new Size(1180, 820);
        MinimumSize = new Size(700, 500);
        StartPosition = FormStartPosition.CenterScreen;
        try { Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath); } catch (Exception) { }
        status.Dock = DockStyle.Fill;
        status.TextAlign = ContentAlignment.MiddleCenter;
        status.ForeColor = dark ? Color.FromArgb(133, 133, 133) : Color.FromArgb(127, 127, 127);
        status.Font = new Font("Segoe UI", 11f);
        status.Text = "Starting OmniGPT…";
        wv.Dock = DockStyle.Fill;
        wv.DefaultBackgroundColor = bg;
        wv.Visible = false;
        Controls.Add(wv);
        Controls.Add(status);
        HandleCreated += delegate
        {
            int on = dark ? 1 : 0; // dark title bar to match the app
            Native.DwmSetWindowAttribute(Handle, 20, ref on, 4);
        };
        Load += OnLoad;
        FormClosing += OnClosing;
    }

    static bool ServerUp()
    {
        try
        {
            HttpWebRequest r = (HttpWebRequest)WebRequest.Create(Url);
            r.Timeout = 1500;
            using (HttpWebResponse p = (HttpWebResponse)r.GetResponse()) { return p.StatusCode == HttpStatusCode.OK; }
        }
        catch (Exception) { return false; }
    }

    void StartBackend()
    {
        if (ServerUp()) return; // something already serves the app (for example a development server)
        string node = Path.Combine(root, "runtime", "node.exe");
        string app = Path.Combine(root, "app");
        if (!File.Exists(node)) throw new Exception("runtime\\node.exe is missing from the installation.");
        Directory.CreateDirectory(dataDir);
        log = new StreamWriter(Path.Combine(dataDir, "server.log"), false) { AutoFlush = true };
        ProcessStartInfo psi = new ProcessStartInfo(node, "\"" + Path.Combine(app, "server.mjs") + "\"");
        psi.WorkingDirectory = app;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true; // no terminal window, ever
        psi.RedirectStandardOutput = true;
        psi.RedirectStandardError = true;
        psi.EnvironmentVariables["OMNIGPT_PARENT_PID"] = Process.GetCurrentProcess().Id.ToString();
        string key = Environment.GetEnvironmentVariable("OMNIROUTE_API_KEY");
        if (string.IsNullOrEmpty(key)) key = Environment.GetEnvironmentVariable("OMNIROUTE_API_KEY", EnvironmentVariableTarget.User);
        if (!string.IsNullOrEmpty(key)) psi.EnvironmentVariables["OMNIROUTE_API_KEY"] = key;
        server = Process.Start(psi);
        DataReceivedEventHandler h = delegate(object o, DataReceivedEventArgs a) { if (a.Data != null) lock (log) { log.WriteLine(a.Data); } };
        server.OutputDataReceived += h;
        server.ErrorDataReceived += h;
        server.BeginOutputReadLine();
        server.BeginErrorReadLine();
    }

    static bool WaitForServer(int ms)
    {
        DateTime end = DateTime.Now.AddMilliseconds(ms);
        while (DateTime.Now < end) { if (ServerUp()) return true; Thread.Sleep(250); }
        return false;
    }

    async void OnLoad(object sender, EventArgs e)
    {
        try
        {
            await Task.Run(delegate { StartBackend(); });
            string profile = Path.Combine(dataDir, "webview");
            Directory.CreateDirectory(profile);
            env = await CoreWebView2Environment.CreateAsync(null, profile);
            await wv.EnsureCoreWebView2Async(env);
            wv.CoreWebView2.WebMessageReceived += delegate(object o, CoreWebView2WebMessageReceivedEventArgs a)
            {   // only the OmniGPT page itself may ask for the console
                if (a.Source == null || !a.Source.StartsWith(Url)) return;
                string m = a.TryGetWebMessageAsString();
                if (m == "console") ShowConsole();
                else if (m == "saved" && saving && !saved) { saved = true; BeginInvoke((MethodInvoker)delegate { Close(); }); }
            };
            wv.CoreWebView2.NewWindowRequested += delegate(object o, CoreWebView2NewWindowRequestedEventArgs a)
            {   // links in answers open in the normal browser, never inside this window
                a.Handled = true;
                if (a.Uri != null && (a.Uri.StartsWith("http://") || a.Uri.StartsWith("https://")))
                {
                    try { Process.Start(a.Uri); } catch (Exception) { }
                }
            };
            bool up = await Task.Run(delegate { return WaitForServer(30000); });
            if (!up) throw new Exception("The OmniGPT backend did not start in time.");
            wv.Source = new Uri(Url);
            wv.Visible = true;
            status.Visible = false;
        }
        catch (Exception ex)
        {
            status.Text = "OmniGPT could not start.\r\n\r\n" + ex.Message + "\r\n\r\nLog: " + Path.Combine(dataDir, "server.log");
        }
    }

    static string JsString(string s)
    {
        System.Text.StringBuilder sb = new System.Text.StringBuilder("\"");
        foreach (char c in s)
        {
            if (c == '\\') sb.Append("\\\\");
            else if (c == '"') sb.Append("\\\"");
            else if (c == '\n') sb.Append("\\n");
            else if (c == '<') sb.Append("\\u003c");
            else if (c < 32) { if (c != '\r') sb.Append("\\u" + ((int)c).ToString("x4")); }
            else sb.Append(c);
        }
        return sb.Append("\"").ToString();
    }

    // Runs in every OmniRoute page before its own scripts: the OmniGPT look plus a way back to the chat.
    string ConsoleScript()
    {
        string css = "";
        try { css = File.ReadAllText(Path.Combine(root, "app", "console-theme.css")); } catch (Exception) { }
        css += "#omnigpt-back{position:fixed;right:16px;bottom:16px;z-index:2147483647;background:var(--color-card,#fbfbfa);color:var(--color-text-main,#262626);" +
               "border:1px solid var(--color-border,#dcdcda);border-radius:8px;padding:7px 13px;font:500 13px 'Segoe UI Variable Text','Segoe UI',sans-serif;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.18)}" +
               "#omnigpt-back:hover{border-color:var(--color-text-muted,#7f7f7f)}";
        return "(function(){if(location.origin!==" + JsString(OmniRouteUrl) + ")return;function add(){if(document.getElementById('omnigpt-theme'))return;" +
               "var s=document.createElement('style');s.id='omnigpt-theme';s.textContent=" + JsString(css) + ";(document.head||document.documentElement).appendChild(s);" +
               "var b=document.createElement('button');b.id='omnigpt-back';b.type='button';b.textContent='Back to OmniGPT';" +
               "b.onclick=function(){window.chrome.webview.postMessage('back')};document.body.appendChild(b);}" +
               "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add();})();";
    }

    async void ShowConsole()
    {
        try
        {
            if (console == null)
            {
                console = new WebView2();
                console.Dock = DockStyle.Fill;
                console.DefaultBackgroundColor = bg;
                Controls.Add(console);
                console.BringToFront();
                await console.EnsureCoreWebView2Async(env);
                await console.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(ConsoleScript());
                console.CoreWebView2.WebMessageReceived += delegate(object o, CoreWebView2WebMessageReceivedEventArgs a)
                {
                    if (a.Source != null && a.Source.StartsWith(OmniRouteUrl) && a.TryGetWebMessageAsString() == "back") HideConsole();
                };
                console.Source = new Uri(OmniRouteUrl + "/dashboard");
            }
            console.Visible = true;
            console.BringToFront();
            console.Focus();
        }
        catch (Exception ex) { MessageBox.Show(this, "The OmniRoute console could not open.\r\n\r\n" + ex.Message, "OmniGPT"); }
    }

    void HideConsole()
    {
        if (console != null) console.Visible = false;
        wv.Focus();
    }

    bool saving, saved; // the page gets a moment to save unsaved settings and chats before the backend stops

    void OnClosing(object sender, FormClosingEventArgs e)
    {
        if (!saved && e.CloseReason != CloseReason.WindowsShutDown && wv.CoreWebView2 != null && !status.Visible)
        {
            e.Cancel = true;
            if (saving) return;
            saving = true;
            System.Windows.Forms.Timer t = new System.Windows.Forms.Timer();
            t.Interval = 3000; // never hold the window open longer than this
            t.Tick += delegate { t.Stop(); if (!saved) { saved = true; Close(); } };
            t.Start();
            try { wv.CoreWebView2.ExecuteScriptAsync("Promise.resolve(typeof flushKV==='function'&&flushKV()).finally(function(){chrome.webview.postMessage('saved')})"); }
            catch (Exception) { t.Stop(); saved = true; BeginInvoke((MethodInvoker)delegate { Close(); }); }
            return;
        }
        saved = true;
        try
        {
            if (server != null && !server.HasExited)
            {   // stop the backend and anything it started (OmniRoute), with no visible window
                ProcessStartInfo k = new ProcessStartInfo("taskkill", "/PID " + server.Id + " /T /F");
                k.CreateNoWindow = true;
                k.UseShellExecute = false;
                Process p = Process.Start(k);
                p.WaitForExit(5000);
            }
        }
        catch (Exception) { }
        try { if (console != null) console.Dispose(); } catch (Exception) { }
        try { wv.Dispose(); } catch (Exception) { }
    }
}
