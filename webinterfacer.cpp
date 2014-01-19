#include "webinterfacer.h"
#include <QMainWindow>
#include <QWebFrame>
#include <QWebInspector>
#include <QGraphicsWebView>

webInterfacer::webInterfacer(QMainWindow* MainWindow, Ui::MainWindow* UI){
       //keep reference to the web interface and main window UI
       this->mainWindow = MainWindow;
       this->ui = UI;

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
    mainWindow->setWindowTitle(title);
}

void webInterfacer::setDebug(bool debugOn){
    if(debugOn == true) {
        //turn on web inspector
        ui->webView->page()->settings()->setAttribute(QWebSettings::DeveloperExtrasEnabled, true);
        QWebInspector inspector;
        inspector.setPage(ui->webView->page());
        inspector.setVisible(true);

    }
}
