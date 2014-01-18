#-------------------------------------------------
#
# SweetERP Team
# SweetERP Qt C++ WebKit, Enyo, Bootstrap Mashup
#
#-------------------------------------------------

QT       += core gui webkitwidgets

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = serpDesktop
TEMPLATE = app


SOURCES += main.cpp \
    mainwindow.cpp \
    webinterfacer.cpp

HEADERS  += mainwindow.h \
    webinterfacer.h

FORMS    += \
    mainwindow.ui

RESOURCES += \
    serp.qrc
