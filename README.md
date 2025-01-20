# EasyCMD VS Code Extension

EasyCMD is a lightweight and efficient Visual Studio Code extension designed to make terminal command execution seamless and productive. With EasyCMD, you can quickly highlight, execute, and manage terminal commands directly from your editor. This extension includes features like command highlighting, CodeLens functionalities, and custom keybindings to improve your workflow.

## Features

-   **Easy Command Management in `.easycmd` Files**  
    Highlight and execute commands from `.easycmd` files with just a click.  
    You can rename any `.txt` file to have the `.easycmd` extension to unlock these features.

    ![EasyCMD Command Management](https://github.com/lirrensi/easycmd/raw/master/images/img_special.png)

-   **Inline Command Execution Using CodeLens**  
     Write commands in a supported syntax within any file and execute them seamlessly. EasyCMD supports commands such as:
    `easycmd> echo 'hello'`
    `cmd> echo 'hello'`
    `bash> echo 'hello'`

CodeLens will appear above these commands, allowing you to execute them quickly.

![CodeLens Example](https://github.com/lirrensi/easycmd/raw/master/images/img_code.png)

-   **Run Commands in Different Terminal Modes**  
    Choose how to execute your commands:
-   **Current VS Code Terminal**
-   **New VS Code Terminal**
-   **External Dedicated Terminal**

-   **Syntax Highlighting for Commands**  
    Terminal commands written in `.easycmd` files are highlighted for improved readability.

-   **Customizable Keybindings for Quick Actions**  
    EasyCMD provides default keyboard shortcuts for common actions:
-   `Ctrl+X Ctrl+C` → Paste in the current terminal
-   `Ctrl+X Ctrl+V` → Run in the current terminal
-   `Ctrl+X Ctrl+B` → Run in a new VS Code terminal
-   `Ctrl+X Ctrl+N` → Run in an external terminal

-   **Right-Click Context Menu and Editor Title Toolbar**  
    Access EasyCMD functionality directly from the editor's context menu, which appears when text is selected in any file.

![Context Menu Example](https://github.com/lirrensi/easycmd/raw/master/images/img_context.png)

EasyCMD also adds two small buttons to the navigation bar for quick access:

![Toolbar Buttons](https://github.com/lirrensi/easycmd/raw/master/images/img_buttons.png)

---

## Requirements

Before using EasyCMD, ensure you have the following installed:

-   **Visual Studio Code** version `^1.96.0` or higher.
-   A functional terminal setup in VS Code and (optionally) an external terminal application.

---

## Extension Settings

EasyCMD does not add specific user-visible configuration settings. However, all its commands (e.g., `easycmd.runInCurrentTerminal`) are fully accessible in `keybindings.json` if you wish to customize or remap them.

---

## Known Issues

-   Syntax highlighting in `.easycmd` files may not correctly apply in certain edge cases.
-   Running commands in external terminals is platform-dependent and might require additional configuration.

Please report all issues [here](https://github.com/lirrensi/easycmd/issues).

---

## Release Notes

### 0.1.0

-   Initial release of EasyCMD.
-   Core features:
    -   Syntax highlighting for `.easycmd` files.
    -   Inline CodeLens for `easycmd` commands.
    -   Keybindings for executing commands in different terminal modes.
    -   Context menu and editor title bar actions for selected commands.

---

## Getting Started

1. Open or create a `.easycmd` file.
2. Write terminal commands directly into the file and execute them using:

-   **Context Menu** → Right-click on the selected text and use "Run in Terminal" commands.
-   **Keyboard Shortcuts** → Use `Ctrl+X` combinations for quick actions.

3. In any file, add `easycmd > cmd > your-command` lines to use inline CodeLens features.

### Accessing EasyCMD Commands

You can access EasyCMD commands through:

-   **Command Palette (`Ctrl+Shift+P`)** → Search for "EasyCMD".
-   **Keyboard shortcuts** (e.g., `Ctrl+X Ctrl+V`).

---

## For More Information

-   Check out the [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines) for developing VS Code extensions.
-   Learn more about [Command Palettes in VS Code](https://code.visualstudio.com/docs/getstarted/userinterface).

We'd love to hear your feedback and feature suggestions—file issues or start discussions on our GitHub repository.

**Enjoy using EasyCMD!**
