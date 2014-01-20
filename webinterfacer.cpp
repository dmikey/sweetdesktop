#include "webinterfacer.h"
#include <QMainWindow>
#include <QWebFrame>
#include <QWebInspector>
#include <QGraphicsWebView>

//constructor
webInterfacer::webInterfacer(QMainWindow* MainWindow, Ui::MainWindow* UI){
       //keep reference to the web interface and main window UI
       this->mainWindow = MainWindow;
       this->ui = UI;
}


//js accessable interactions
void webInterfacer::setTitle(QString title){
    mainWindow->setWindowTitle(title);
}

//set debug on
void webInterfacer::setDebug(bool debugOn){
    if(debugOn == true) {
        //turn on web inspector
        ui->webView->page()->settings()->setAttribute(QWebSettings::DeveloperExtrasEnabled, true);
        //ui->webView->setContextMenuPolicy(Qt::ContextMenuPolicy::DefaultContextMenu);
        QWebInspector inspector;
        inspector.setPage(ui->webView->page());
        inspector.setVisible(true);

    }
}
