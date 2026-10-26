
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
serial.setWriteLinePadding(0)

basic.showIcon(IconNames.SmallDiamond)
basic.pause(300)
basic.clearScreen()

serial.onDataReceived(
    serial.delimiters(Delimiters.NewLine),
    function () {
        let command = serial.readUntil(
            serial.delimiters(Delimiters.NewLine)
        )

        // 웹앱에서 받은 클래스 이름을 그대로 비교합니다.
        // 클래스 이름의 대소문자를 임의로 변경하지 않습니다.
        if (command == "OK") {
            basic.showIcon(IconNames.Yes)
            serial.writeLine("OK 표시 완료")
        } else if (command == "HELP") {
            // 도움 요청을 나타내는 X 모양 표시
            basic.showIcon(IconNames.No)
            serial.writeLine("HELP 표시 완료")
        } else if (command == "QUESTION") {
            basic.showString("?")
            serial.writeLine("QUESTION 표시 완료")
        } else if (command.length > 0) {
            // 추가 클래스가 있다면 이름을 표시해 통신을 확인합니다.
            basic.showString(command)
            serial.writeLine("수신 완료: " + command)
        }
    }
)
