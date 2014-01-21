#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    //setting the application name for the browser's userAgent string
    a.setApplicationName(QString("sweetDesktop"));

    MainWindow w;
    w.show();

    return a.exec();
}
