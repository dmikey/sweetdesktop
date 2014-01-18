#ifndef WEBINTERFACER_H
#define WEBINTERFACER_H

#include <QObject>

class QMainWindow;

class webInterfacer : public QObject
{
Q_OBJECT

public:
    QMainWindow* mainWindow;
    void setMainWindow(QMainWindow);



private:



public slots:
    void setTitle(QString);


signals:


};



#endif // WEBINTERFACER_H
