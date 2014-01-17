#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :


    QMainWindow(parent),
    ui(new Ui::MainWindow)
{


    ui->setupUi(this);
    ui->webView->setSizePolicy(QSizePolicy ::Expanding , QSizePolicy ::Expanding );


    ui->webView->page()->settings()->setAttribute(QWebSettings::DeveloperExtrasEnabled, true);
    QWebInspector inspector;
    inspector.setPage(ui->webView->page());
    inspector.setVisible(true);
}

MainWindow::~MainWindow()
{
    delete ui;
}
