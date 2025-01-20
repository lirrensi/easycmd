import * as vscode from "vscode";
import { defineCommands } from "./defineCommands";
import { EasyCmdCodeLensProvider } from "./EasyCmdCodeLensProvider";
import { EasyCmdSemanticTokensProvider } from "./SemanticProvider";

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "easycmd" is now active!');

    // add ext commands
    const commands = defineCommands();
    context.subscriptions.push(...commands);

    // Register the .easycmd file type
    const textFileSelector: vscode.DocumentSelector = [
        {
            scheme: "file",
            pattern: "**/*", // This will match all files
        },
    ];

    // register code lens
    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider(textFileSelector, new EasyCmdCodeLensProvider()),
    );

    // Register Semantic Tokens provider
    const semanticTokensProvider = new EasyCmdSemanticTokensProvider();
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { pattern: "**/*" }, // All files
            semanticTokensProvider,
            semanticTokensProvider.getLegend(),
        ),
    );
}

export function deactivate() {}
