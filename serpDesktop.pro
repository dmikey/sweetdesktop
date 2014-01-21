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

macx:LIBS += -framework Foundation -framework ApplicationServices -framework AppKit -framework CoreServices
macx:DEFINES += MAC_OSX MSG_NOSIGNAL=0
macx:ICON = share/osx/sweetdesktop.icns
macx:QMAKE_CFLAGS_THREAD += -pthread
macx:QMAKE_LFLAGS_THREAD += -pthread
macx:QMAKE_CXXFLAGS_THREAD += -pthread
macx:QMAKE_INFO_PLIST = share/osx/Info.plist

SOURCES += main.cpp \
    mainwindow.cpp \
    webinterfacer.cpp

HEADERS  += mainwindow.h \
    webinterfacer.h

FORMS    += \
    mainwindow.ui

RESOURCES += \
    serp.qrc
