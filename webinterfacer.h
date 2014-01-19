#ifndef WEBINTERFACER_H
#define WEBINTERFACER_H

#include <QObject>
#include "ui_mainwindow.h"

class QMainWindow;

class webInterfacer : public QObject
{
Q_OBJECT

public:
    QMainWindow* mainWindow;
    Ui::MainWindow* ui;
    void setMainWindow(QMainWindow);
    explicit webInterfacer(QMainWindow* MainWindow = 0, Ui::MainWindow* ui = 0);

private:


public slots:
    void setTitle(QString);
    void handleWebviewLoad();

signals:


};



#endif // WEBINTERFACER_H
