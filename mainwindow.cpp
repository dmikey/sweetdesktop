#include "mainwindow.h"
#include "ui_mainwindow.h"

#include "webinterfacer.h"
#include <QWebFrame>


webInterfacer* webInterface;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    webInterface = new webInterfacer();

    ui->setupUi(this);
    ui->webView->page()->currentFrame()->addToJavaScriptWindowObject(QString("qtInterface"), webInterface);

    connect(ui->webView,SIGNAL(loadFinished(bool)), this, SLOT(handleWebviewLoad()));

    webInterface->mainWindow = this;
}

// handle web events
void MainWindow::handleWebviewLoad(){
    ui->webView->page()->currentFrame()->addToJavaScriptWindowObject(QString("qtInterface"), webInterface);
}

MainWindow::~MainWindow()
{
    delete ui;
}
