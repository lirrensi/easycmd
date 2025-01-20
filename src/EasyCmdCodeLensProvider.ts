import * as vscode from "vscode";

import { getContentToCheck } from "./helpers";

export class EasyCmdCodeLensProvider implements vscode.CodeLensProvider {
    private attachCodeLens(codeLenses: vscode.CodeLens[], range: vscode.Range, commandText: string) {
        // copyToClipboard,
        // pasteInCurrentTerminal,
        // runInCurrentTerminal,
        // runInNewTerminalVSCode,
        // runInNewTerminalExternal,

        codeLenses.push(
            new vscode.CodeLens(range, {
                title: "📋 Copy",
                command: "easycmd.copyToClipboard",
                arguments: [commandText],
            }),
        );
        codeLenses.push(
            new vscode.CodeLens(range, {
                title: "⌨️ PasteHere",
                command: "easycmd.pasteInCurrentTerminal",
                arguments: [commandText],
            }),
        );

        codeLenses.push(
            new vscode.CodeLens(range, {
                title: "▶️ RunHere",
                command: "easycmd.runInCurrentTerminal",
                arguments: [commandText],
            }),
        );
        codeLenses.push(
            new vscode.CodeLens(range, {
                title: "⚡ RunNew",
                command: "easycmd.runInNewTerminalVSCode",
                arguments: [commandText],
            }),
        );
        codeLenses.push(
            new vscode.CodeLens(range, {
                title: "🪟 RunExternal",
                command: "easycmd.runInNewTerminalExternal",
                arguments: [commandText],
            }),
        );
    }
    public async provideCodeLenses(document: vscode.TextDocument): Promise<vscode.CodeLens[]> {
        // Define patterns based on document type
        let targetPatterns: string[] = [];
        if (document.languageId === "easycmd") {
            targetPatterns = [">"];
        } else {
            targetPatterns = ["easycmd>", "cmd>", "bash>"];
        }

        const codeLenses: vscode.CodeLens[] = [];
        const text = document.getText();
        const lines = text.split("\n");

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Check for patterns in comments or direct in line
            const contentToCheck = getContentToCheck(line);

            // Check if any of our patterns match
            const matchedPattern = targetPatterns.find(pattern => contentToCheck.startsWith(pattern));

            if (matchedPattern) {
                const commandText = contentToCheck.substring(matchedPattern.length).trim();
                const range = new vscode.Range(i, 0, i, line.length);

                this.attachCodeLens(codeLenses, range, commandText);
            }
        }

        return codeLenses;
    }
}
