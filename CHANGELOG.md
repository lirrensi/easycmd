# Changelog

All notable changes to the EasyCMD extension will be documented in this file.

## [0.1.1] - Update

-   Turns out making CTRL X command was bad for usability, changed to ALT + X + <next>

## [0.1.0] - Initial Release

### Added

-   Basic support for `.easycmd` files:

    -   Write and highlight terminal commands.
    -   Seamlessly execute commands with built-in functionality.

-   **Five Core Commands:**

    1. **Copy to Clipboard** (`easycmd.copyToClipboard`)
    2. **Paste in Current Terminal** (`easycmd.pasteInCurrentTerminal`)
    3. **Run in Current Terminal** (`easycmd.runInCurrentTerminal`)
    4. **Run in New VS Code Terminal** (`easycmd.runInNewTerminalVSCode`)
    5. **Run in Dedicated External Terminal** (`easycmd.runInNewTerminalExternal`).

-   **CodeLens Integration**:

    -   Inline CodeLens appears for `easycmd > cmd > your-command` in any file.

-   **Syntax Highlighting**:

    -   Terminal commands in `.easycmd` files are highlighted for easier readability.

-   **Keybindings**:

    -   Default keybindings added for all commands. For example:
        -   `Ctrl+X Ctrl+V` → Run in the current terminal.
        -   `Ctrl+X Ctrl+N` → Run in a new external terminal.

-   **Context Menu and Toolbar Integration**:

    -   Added options for commands to the right-click context menu when text is selected.
    -   Commands displayed in the editor’s title toolbar for quick access.

-   Supports external terminal execution for greater flexibility (platform-dependent).

---
