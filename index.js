import { Printer } from "@node-escpos/core";
// install escpos-usb adapter module manually
import USB from "@node-escpos/usb-adapter";
// Select the adapter based on your printer type
import { join } from "path";

const device = new USB();

device.open(async function (err) {
  if (err) {
    // handle error
    return;
  }

  // encoding is optional
  const options = { encoding: "GB18030" /* default */ };
  let printer = new Printer(device, options);

  // Path to png image

  printer
    .font("a")
    .align("ct")
    .style("bu")
    .size(1, 1)
    .text("Hello World!")
    .marginBottom(10)
    .tableCustom(
      [
        { text: "Sample Product 1", align: "LEFT", width: 0.5, style: "B" },
        { text: "Qty 1x", align: "RIGHT", width: 0.5 }
      ],
      { encoding: "cp857", size: [1, 1] } // Optional
    )
    .marginBottom(2)
    .tableCustom(
      [
        { text: "Sample Product 2", align: "LEFT", width: 0.5, style: "B" },
        { text: "Rp 120.000,00 Qty 2x", align: "RIGHT", width: 0.5 }
      ],
      { encoding: "cp857", size: [1, 1] } // Optional
    )
    .drawLine()
    .tableCustom([
      { text: "Subtotal", align: "LEFT", width: 0.5, style: "B" },
      { text: "Rp 240.000,00", align: "RIGHT", width: 0.5 }
    ])
    .marginBottom(20)
    .cut()
    .close();

  // inject qrimage to printer
  // inject image to printer
});
