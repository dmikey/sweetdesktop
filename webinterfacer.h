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
    explicit webInterfacer(QMainWindow* MainWindow = 0, Ui::MainWindow* UI = 0);

private:


public slots:
    void setTitle(QString);
    void setDebug(bool);

private slots:
    void handleWebviewLoad();

signals:


};



#endif // WEBINTERFACER_H
