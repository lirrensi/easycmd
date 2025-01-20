import * as vscode from "vscode";
import { runCommandInExternalTerminal } from "./helpers";

export function defineCommands(): vscode.Disposable[] {
    // Command: copyToClipboard
    const copyToClipboard = vscode.commands.registerCommand("easycmd.copyToClipboard", async (line?: string) => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let selection = line && line.length ? line : editor.document.getText(editor.selection);
            selection = selection.trimEnd();

            try {
                await vscode.env.clipboard.writeText(selection);
                vscode.window.showInformationMessage("Copied to clipboard: " + selection);
            } catch (error) {
                vscode.window.showErrorMessage("Failed to copy to clipboard.");
            }
        } else {
            vscode.window.showErrorMessage("No active text editor found.");
        }
    });

    // Command: Copy Selection to Terminal
    const pasteInCurrentTerminal = vscode.commands.registerCommand(
        "easycmd.pasteInCurrentTerminal",
        (line?: string) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                let selection = line && line.length ? line : editor.document.getText(editor.selection);
                selection = selection.trimEnd();

                const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
                terminal.sendText(selection, false); // Send text without executing
                terminal.show();
            }
        },
    );

    // Command: Copy Selection to Terminal and Execute
    const runInCurrentTerminal = vscode.commands.registerCommand("easycmd.runInCurrentTerminal", (line?: string) => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let selection = line && line.length ? line : editor.document.getText(editor.selection);
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
            terminal.sendText(selection, true); // Send text and execute
            terminal.show();
        }
    });

    // Command: Open New Terminal and Execute
    const runInNewTerminalVSCode = vscode.commands.registerCommand(
        "easycmd.runInNewTerminalVSCode",
        (line?: string) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                let selection = line && line.length ? line : editor.document.getText(editor.selection);
                const terminal = vscode.window.createTerminal();
                terminal.sendText(selection, true); // Send text and execute
                terminal.show();
            }
        },
    );

    // Command: Open New Terminal and Execute in External Shell
    const runInNewTerminalExternal = vscode.commands.registerCommand(
        "easycmd.runInNewTerminalExternal",
        (line?: string) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                let selection = line && line.length ? line : editor.document.getText(editor.selection);
                runCommandInExternalTerminal(selection);
            }
        },
    );

    return [
        copyToClipboard,
        pasteInCurrentTerminal,
        runInCurrentTerminal,
        runInNewTerminalVSCode,
        runInNewTerminalExternal,
    ];
}
