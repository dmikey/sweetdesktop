#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "webinterfacer.h"

#include <QWebFrame>

webInterfacer* webInterface;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    webInterface = new webInterfacer(this, ui);

    //connect webInterfacer to the webframe
    ui->webView->page()->currentFrame()->addToJavaScriptWindowObject(QString("qtInterface"), webInterface);

    //connect load finished, so incase the page is refreshed by accident
    connect(ui->webView, SIGNAL(loadFinished(bool)), this, SLOT(handleWebviewLoad()));

}


void MainWindow::handleWebviewLoad(){
    ui->webView->page()->currentFrame()->addToJavaScriptWindowObject(QString("qtInterface"), webInterface);
}



MainWindow::~MainWindow()
{
    delete ui;
}
