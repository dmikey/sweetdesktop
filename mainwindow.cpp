#include "mainwindow.h"
#include "ui_mainwindow.h"

#include "webinterfacer.h"
#include <QWebFrame>



MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    webInterfacer* webInterface = new webInterfacer(this, ui);
}

MainWindow::~MainWindow()
{
    delete ui;
}
