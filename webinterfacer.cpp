#include "webinterfacer.h"
#include <QMainWindow>
#include <QWebFrame>


webInterfacer::webInterfacer(QMainWindow* MainWindow, Ui::MainWindow* ui){
       //keep reference to the web interface and main window UI
       this->mainWindow = MainWindow;
       this->ui = ui;

       //connect instance of the web interfacer
       ui->webView->page()->currentFrame()->addToJavaScriptWindowObject(QString("qtInterface"), this);

       //connect load finished, so incase the page is refreshed by accident
       connect(ui->webView,SIGNAL(loadFinished(bool)), this, SLOT(handleWebviewLoad()));
}

//handle web events
void webInterfacer::handleWebviewLoad(){
    ui->webView->page()->currentFrame()->addToJavaScriptWindowObject(QString("qtInterface"), this);
}

//js accessable interactions
void webInterfacer::setTitle(QString title){
    this->mainWindow->setWindowTitle(title);
}
