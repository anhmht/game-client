import socketIOClient from "socket.io-client";
import { CookieService, ECookieVariable } from "../cookie";
import { TradeService } from "../trade";
import { store } from "@/src/redux/store";

let counter: number = 0;
export class SocketService {
    static socket?: SocketIOClient.Socket;
    static subscribeRoom: string[] = [];

    static COMMAND_TYPE = {
        REFRESH_BALANCE: "REFRESH_BALANCE",
        NEW_TRANSACTION: "NEW_TRANSACTION",
        NEW_MARKET_INFO: "NEW_MARKET_INFO",
        UPDATE_ACTIVE_ORDER: "UPDATE_ACTIVE_ORDER",
        ORDER_RESULT: "ORDER_RESULT",
        NEW_CANDLE: "NEW_CANDLE",
        CANDLE_UPDATED: "CANDLE_UPDATED",
        NEW_CANDLE_VOLUME: "NEW_CANDLE_VOLUME",
        REFRESH_RANK: "REFRESH_RANK",
        NEW_ANNOUNCEMENT: "NEW_ANNOUNCEMENT",
        NEW_MARQUEE: "NEW_MARQUEE",
        SOCKET_COMMAND_BOT_WIN: "SOCKET_COMMAND_BOT_WIN",
        SOCKET_COMMAND_BOT_LOSE: "SOCKET_COMMAND_BOT_LOSE",
        SOCKET_DEPOSIT_BONUS: "SOCKET_DEPOSIT_BONUS"
    };

    static EMIT_TYPE = {
        SUBSCRIBE: "SUBSCRIBE_SUB_ROOM",
        UNSUBSCRIBE: "UNSUBSCRIBE_SUB_ROOM",
    };

    static MARKET_NAME = {
        UNIC_ETH: "UNIC/ETH",
    };

    static NEW_TRANSACTION_TYPE = {
        MATCH_ORDER: "MATCH_ORDER",
        DEPOSIT: "DEPOSIT",
        WITHDRAW: "WITHDRAW",
        RECEIVE_TRANSFER: "RECEIVE_TRANSFER",
        BUY_MINER_COMMISSION: "BUY_MINER_COMMISSION",
        SYSTEM_COMMISSION: "SYSTEM_COMMISSION",
        MINER_INCOME: "MINER_INCOME",
        TRADING_COMMISSION: "TRADING_COMMISSION",
        REFUND_WITHDRAW: "REFUND_WITHDRAW",
        UPGRADE_MINER_COMMISSION: "UPGRADE_MINER_COMMISSION",
        PURCHASE_SHARED_PACKAGE_COMMISSION: "PURCHASE_SHARED_PACKAGE_COMMISSION",
    };

    static NOTIFICATION_TYPE = {
        REFRESH_NOTIFICATION: "REFRESH_NOTIFICATION",
    };

    static disconnect() {
        if (!this.socket) return;
        const symbolId = TradeService.getSymbolIdFromSymbolName(decodeURIComponent(CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_NAME)), store);
        const coinId = TradeService.getCoinIdFromCoinCode(CookieService.get(ECookieVariable.USER_TRADE_COIN), store);
        this.socket.emit(this.EMIT_TYPE.UNSUBSCRIBE, `MARKET_INFO_SYMBOL_ID=${symbolId}_COIN_ID=${coinId}`);
        this.socket.emit(this.EMIT_TYPE.UNSUBSCRIBE, `CANDLE_UPDATED_SYMBOL_ID=${symbolId}`);
        this.socket.emit(this.EMIT_TYPE.UNSUBSCRIBE, `CANDLE_VOLUME_SYMBOL_ID=${symbolId}_COIN_ID=${coinId}`);
        this.socket.emit(this.EMIT_TYPE.UNSUBSCRIBE, "ANNOUNCEMENT");
        this.socket.emit(this.EMIT_TYPE.UNSUBSCRIBE, "MARQUEE");

        this.removeListenerCommand();
        this.subscribeRoom = [];
        this.socket.disconnect();
        this.socket = undefined;
    }

    static on(inCommand: string, callBack: (payload: any) => void) {
        if (!this.socket) return;
        this.socket.on("reconnect", function () {
            window.location.reload();
        });
        return this.socket.on("NEW_SERVER_COMMAND", (command: any, payload: any) => {
            console.log("file: socker.service.ts:77 ~ SocketService ~ returnthis.socket.on ~ command:", command)
            // console.log(command, payload);
            if (inCommand === command) callBack(payload);
        });
    }

    // static on(inCommand: string, callBack: (payload: any) => void) {
    //   return this.initialize().on("NEW_SERVER_COMMAND", (command: any, payload: any) => {
    //     // console.log(command, payload);
    //     if (inCommand === command) callBack(payload);
    //   });
    // }

    // static initialize(): SocketIOClient.Socket {
    //   if (!this.socket) {
    //     const socket = socketIOClient(
    //       `${getEnv("URL_API_MAIN_CLIENT_SIDE")}?token=${CookieService.get(
    //         ECookieVariable.USER_ACCESS_TOKEN
    //       )}&appId=${getEnv("URL_SOCKET_APP_ID")}`,
    //       {
    //         transports: ["websocket"],
    //       }
    //     );
    //     this.socket = socket;

    //     const symbolId = TradeService.getSymbolIdFromSymbolName(
    //       decodeURIComponent(CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_NAME)),
    //       getClientStore()
    //     );
    //     const coinId = TradeService.getCoinIdFromCoinCode(
    //       CookieService.get(ECookieVariable.USER_TRADE_COIN),
    //       getClientStore()
    //     );

    //     socket.emit(this.EMIT_TYPE.SUBSCRIBE, `MARKET_INFO_SYMBOL_ID=${symbolId}_COIN_ID=${coinId}`);
    //     socket.emit(this.EMIT_TYPE.SUBSCRIBE, `CANDLE_UPDATED_SYMBOL_ID=${symbolId}`);
    //     socket.emit(
    //       this.EMIT_TYPE.SUBSCRIBE,
    //       `CANDLE_VOLUME_SYMBOL_ID=${symbolId}_COIN_ID=${coinId}`
    //     );

    //     socket.on("reconnect_attempt", () => {
    //       socket.io.opts.transports = ["polling", "websocket"];
    //       socket.emit(
    //         this.EMIT_TYPE.SUBSCRIBE,
    //         `MARKET_INFO_SYMBOL_ID=${symbolId}_COIN_ID=${coinId}`
    //       );
    //       socket.emit(this.EMIT_TYPE.SUBSCRIBE, `CANDLE_UPDATED_SYMBOL_ID=${symbolId}`);
    //       socket.emit(
    //         this.EMIT_TYPE.SUBSCRIBE,
    //         `CANDLE_VOLUME_SYMBOL_ID=${symbolId}_COIN_ID=${coinId}`
    //       );
    //     });

    //     return socket;
    //   }

    //   return this.socket;
    // }

    static initializeV2(): SocketIOClient.Socket {
        if (!this.socket) {
            const socket = socketIOClient(`${process.env["NEXT_PUBLIC_URL_SOCKET"]}?token=${CookieService.get(ECookieVariable.USER_ACCESS_TOKEN)}&appId=${process.env["NEXT_PUBLIC_URL_SOCKET_APP_ID"]}`, { transports: ["websocket"] });
            this.socket = socket;
            this.register();
            return socket;
        }
        this.socket.on("reconnect", function () {
            window.location.reload();
        });

        this.register();
        return this.socket;
    }

    static removeListenerCommand() {
        if (this.socket) return this.socket.removeAllListeners();
    }

    static subcribe(commandType: string, args?: string) {
        const subcriber: string = args != null ? `${commandType}=${args}` : commandType;
        // console.log('subcriber', subcriber);

        if (!this.socket) return;

        if (this.subscribeRoom.length === 0) {
            // console.log("SUBSCRIBE 1");
            this.socket.emit(this.EMIT_TYPE.SUBSCRIBE, subcriber);
            (this.subscribeRoom as string[]).push(subcriber);
        } else if (!(this.subscribeRoom as string[]).find((item: any) => item === subcriber)) {
            // console.log("SUBSCRIBE 2");

            this.socket.emit(this.EMIT_TYPE.SUBSCRIBE, subcriber);
            (this.subscribeRoom as string[]).push(subcriber);
        }
    }

    static register() {
        if (this.socket) {
            // this.removeListenerCommand();
            SocketService.subcribe("ANNOUNCEMENT");
            SocketService.subcribe("MARQUEE");
            // ...
        }
    }
}
