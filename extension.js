const vscode = require('vscode');
const MsgReader = require('msgreader').MsgReader;

function activate(context) {

    let disposable = vscode.commands.registerCommand('extension.openMsgFile', function () {
        if (vscode.window.activeTextEditor) {
            let msgFileBuffer = Buffer.from(vscode.window.activeTextEditor.document.getText());
            const reader = new MsgReader(msgFileBuffer);
            const msg = reader.getFileData();

            if (!msg.error) {
                const panel = vscode.window.createWebviewPanel(
                    'msgReader',
                    msg.subject,
                    vscode.ViewColumn.One,
                    {}
                );

                panel.webview.html = msg.body;
            } else {
                vscode.window.showErrorMessage('Error reading .msg file: ' + msg.error);
            }
        }
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;
