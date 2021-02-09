export default (dateFrom, dateTo, searchString) => {
    return {
        "dateFrom": dateFrom,
        "dateTo": dateTo,
        "orderType": "sell",
        "onPage": 100,
        "page": 0,
        "searchString": searchString,
        "searchBy": "order_shop_name",
        "filterState": [
            "ACCEPTED","INCOMING", "SENT", "READY2SEND", "PARCEL", "PAYED", "ERROR", "CANCELLED", "REFUNDED", "PARTREFUND", "HOLD", "VERIFIED", "IN_USA", "MONEY_COME", "UNLOCKED", "WAIT_PAY", "TRANSFER"
        ],
        "orderBy": "order_shop_title_asc"
    }
}
