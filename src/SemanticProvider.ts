// semanticProvider.ts
import * as vscode from "vscode";

import { getContentToCheck } from "./helpers";

export class EasyCmdSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    private readonly legend = new vscode.SemanticTokensLegend(["command"]);

    private readonly targetPatterns: { [key: string]: string[] } = {
        easycmd: [">"],
        other: ["easycmd>", "cmd>", "bash>"],
    };

    public getLegend(): vscode.SemanticTokensLegend {
        return this.legend;
    }

    async provideDocumentSemanticTokens(document: vscode.TextDocument): Promise<vscode.SemanticTokens> {
        const builder = new vscode.SemanticTokensBuilder();
        const lines = document.getText().split("\n");
        const patterns = document.languageId === "easycmd" ? this.targetPatterns.easycmd : this.targetPatterns.other;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const contentToCheck = getContentToCheck(line);

            if (contentToCheck) {
                const matchedPattern = patterns.find(pattern => contentToCheck.startsWith(pattern));
                if (matchedPattern) {
                    // Find the actual position in the original line
                    const startIndex = line.indexOf(matchedPattern);
                    const length = contentToCheck.length;

                    builder.push(
                        i, // line number
                        startIndex, // start character
                        length, // length
                        0, // token type (0 = 'command' from legend)
                        0, // token modifiers
                    );
                }
            }
        }

        return builder.build();
    }
}
