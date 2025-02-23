import QRCode from 'react-qr-code'

export default function QrCodes(): JSX.Element {
    return (<div>
        <QRCode value='https://kyleandamanda.wedding/code' bgColor="#2040C0"></QRCode>
    </div>);
}