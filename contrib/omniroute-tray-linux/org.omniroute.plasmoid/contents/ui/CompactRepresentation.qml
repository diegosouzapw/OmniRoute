import QtQuick
import QtQuick.Layouts
import org.kde.plasma.plasmoid
import org.kde.plasma.core as PlasmaCore

Item {
    id: compactRoot

    property var plasmoidItem: null

    readonly property bool isRunning: (plasmoidItem && plasmoidItem.isRunning) || (typeof root !== 'undefined' && root.isRunning)
    readonly property int activeProviders: (plasmoidItem && plasmoidItem.healthActiveProviders) || (typeof root !== 'undefined' && root.healthActiveProviders) || 0
    readonly property real todaySpend: (plasmoidItem && plasmoidItem.todaySpend) || (typeof root !== 'undefined' && root.todaySpend) || 0.0

    Layout.minimumWidth: plasmoid.formFactor === PlasmaCore.Types.Vertical ? 0 : height
    Layout.minimumHeight: plasmoid.formFactor === PlasmaCore.Types.Vertical ? width : 0
    Layout.preferredWidth: plasmoid.formFactor === PlasmaCore.Types.Vertical ? -1 : height
    Layout.preferredHeight: plasmoid.formFactor === PlasmaCore.Types.Vertical ? width : -1

    Image {
        id: iconItem
        anchors.fill: parent
        anchors.margins: 1
        source: compactRoot.isRunning ? 
            Qt.resolvedUrl('../icons/omniroute-tray-running.svg') : 
            Qt.resolvedUrl('../icons/omniroute-tray-white.svg')
        sourceSize.width: width
        sourceSize.height: height
        fillMode: Image.PreserveAspectFit
        smooth: true
    }

    MouseArea {
        id: mouseArea
        anchors.fill: parent
        hoverEnabled: true
        acceptedButtons: Qt.LeftButton

        property bool wasExpanded: false

        onPressed: mouse => {
            if (compactRoot.plasmoidItem) {
                wasExpanded = compactRoot.plasmoidItem.expanded;
            } else if (typeof root !== 'undefined') {
                wasExpanded = root.expanded;
            }
        }

        onClicked: mouse => {
            if (compactRoot.plasmoidItem) {
                compactRoot.plasmoidItem.expanded = !wasExpanded;
            } else if (typeof root !== 'undefined') {
                root.expanded = !wasExpanded;
            }
        }
    }
}
