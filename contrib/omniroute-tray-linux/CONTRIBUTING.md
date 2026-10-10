# Contributing

Thanks for your interest in OmniRoute Tray. Issues and pull requests are welcome.

## Reporting a bug

Open an issue and include:

- Your distribution and desktop environment (and version).
- Which interface you use: the KDE Plasma 6 plasmoid or the standalone PySide6 tray.
- The output of `omniroute-tray --snapshot` if the problem is about displayed data.
- Relevant log lines from `~/.local/state/omniroute-tray/omniroute-tray.log`.

## Development setup

The app has no build step and only needs Python 3.10+ and Git. PySide6 is required only
for the standalone tray, not for the KDE plasmoid or the CLI.

```bash
git clone https://github.com/Susanthakuri92/omniroute-tray-linux.git
cd omniroute-tray-linux
./install.sh
```

Run the sources directly while iterating:

```bash
python3 omniroute_tray.py --snapshot     # full telemetry JSON
python3 omniroute_tray.py --cost --range 7d
python3 omniroute_tray.py                # GUI tray (needs PySide6)
```

### Working on the plasmoid

The plasmoid is loaded from its installed location, so editing the checkout has no effect
until you sync it and restart the shell:

```bash
rsync -a --delete org.omniroute.plasmoid/ \
    ~/.local/share/plasma/plasmoids/org.omniroute.plasmoid/
rm -rf ~/.cache/plasmashell/qmlcache ~/.cache/qmlcache
systemctl --user restart plasma-plasmashell   # see note below
```

> On some sessions `systemctl --user restart plasma-plasmashell` is a no-op and the widget
> keeps the old code. If your changes do not appear, restart the shell directly:
> `kquitapp6 plasmashell && kstart plasmashell`.

## Checks to run before opening a PR

```bash
python3 -m py_compile omniroute_tray.py
bash -n install.sh uninstall.sh
python3 -m json.tool org.omniroute.plasmoid/metadata.json >/dev/null
```

CI runs the same checks on every push and pull request.

## Guidelines

- Match the style of the surrounding code; keep comments to why, not what.
- Keep the two interfaces in sync: a new telemetry field must be added to `FullSnapshot`
  and to whatever the plasmoid reads, or it will silently not appear.
- Do not add runtime dependencies to the plasmoid path — it must keep working with only
  Python 3 and Git.
- Update `CHANGELOG.md` under an `Unreleased` heading for user-visible changes.

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](LICENSE).
