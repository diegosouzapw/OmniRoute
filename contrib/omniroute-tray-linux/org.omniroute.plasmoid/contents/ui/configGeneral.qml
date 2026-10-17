import QtQuick
import QtQuick.Controls as QQC2
import org.kde.kirigami as Kirigami

Kirigami.FormLayout {
    id: page

    property alias cfg_serverUrl: serverUrlField.text
    property alias cfg_showHealth: showHealthCheck.checked
    property alias cfg_showUsage: showUsageCheck.checked
    property alias cfg_showCost: showCostCheck.checked
    property alias cfg_showTrend: showTrendCheck.checked
    property alias cfg_refreshIntervalSec: refreshSpin.value

    QQC2.TextField {
        id: serverUrlField
        Kirigami.FormData.label: i18n("Server URL:")
        placeholderText: "http://127.0.0.1:20128"
    }

    QQC2.CheckBox {
        id: showHealthCheck
        Kirigami.FormData.label: i18n("Visible Sections:")
        text: i18n("Provider health status band")
    }

    QQC2.CheckBox {
        id: showUsageCheck
        text: i18n("Usage & rate limits")
    }

    QQC2.CheckBox {
        id: showCostCheck
        text: i18n("Spend analytics")
    }

    QQC2.CheckBox {
        id: showTrendCheck
        text: i18n("30-day usage trend sparkline")
    }

    QQC2.SpinBox {
        id: refreshSpin
        Kirigami.FormData.label: i18n("Poll Interval (sec):")
        from: 3
        to: 60
        stepSize: 1
    }
}
