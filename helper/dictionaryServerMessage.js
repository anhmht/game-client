const fs = require('fs');

const obj = {
    "CANNOT_FIND_EXCHANGE_RATE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_ADDRESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_COIN": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "COIN_MUST_EXIST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "OUT_OF_AVAILABLE_WALLETS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_NUMBER_OF_INTERNAL_ADDRESS_WALLETS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PARTNER_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PARTNER_STATUS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_IDENTITY": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PARTNER_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "VALUE_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_VALUE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PARTNER_STATUS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_IDENTITY": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PARTNER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_IDENTITY": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_HASH": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "MUST_HAVE_EDIT_RATE_PERMISSION": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_COIN_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_EDIT_ETH_RATE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_TRANSACTION_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_TRANSACTION": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "NUMBER_OF_ITEMS_PER_PAGE_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_TRANSACTION_REQUEST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FROZEN_ACCOUNT_CANNOT_TRANSFER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PIN_CODE_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PIN_CODE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ANOTHER_TRANSACTION_REQUEST_IS_PENDING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_COIN_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_FEE_COIN_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "RECEIVER_EMAIL_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "RECEIVER_IS_NOT_EXIST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_VALUE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "TOO_LONG_DESCRIPTION_LENGTH": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FROZEN_ACCOUNT_CANNOT_WITHDRAW": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ANOTHER_TRANSACTION_REQUEST_IS_PENDING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EXTERNAL_WALLET_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "UNSUPPORTED_WITHDRAW_FEE_COIN": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_VALUE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_COIN_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_FEE_COIN_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "UNSUPPORT_PAY_FEE_WITH_ANOTHER_COIN": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_CODE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_HAVE_NOT_BEEN_UPLOADED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_MUST_BE_PENDING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_HAVE_NOT_BEEN_UPLOADED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_MUST_BE_PENDING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "MUST_UPLOAD_FULL_KYC": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ONLY_EMAIL_VERIFIED_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_EXISTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PAGE_SIZE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_OFFSET": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_NOTIFICATION_IDS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_ORDER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "UNSUPPORTED_TYPE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INSUFFICIENT_FUNDS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PAGE_SIZE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PAGE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_SYMBOL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "WAITING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ACTIVE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "LEFT": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "RIGHT": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PENDING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "APPROVED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REJECTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REFRESH_BALANCE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "NEW_TRANSACTION": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "OPEN": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PARTIALLY_FILLED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FILLED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANCELED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EXPIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "LIMIT": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "MARKET": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "BUY": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SELL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "NOT_READY": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SUCCESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FAIL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PROCESSING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SUCCESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DUPLICATE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CALL_LATER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "UNEXPECTED_ERROR": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "JUST_CREATED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ACCEPTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REJECTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DISABLED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PAY_FOR_MINER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CALCULATE_SYSTEM_INDEX": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PAY_SYSTEM_COMMISSION": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PAY_RANK_COMMISSION": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "UPDATE_INVESTMENT_STATUS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "HOUR": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DATE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "MONTH": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "JUST_CREATED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SUCCESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FAILED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "created": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "value": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "email": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "type": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_REVIEW": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DISABLE_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ENABLE_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EDIT_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "VIEW_USERS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EDIT_RATE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "VIEW_TRANSACTIONS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "UPDATE_PERMISSION": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "VIEW_WITHDRAW_PROGRESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REVIEW_WITHDRAW": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CHANGE_SERVER_CONFIG": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "VIEW_REPORT": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ENABLE_PARTNER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DISABLE_PARTNER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "JUST_REGISTERED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EMAIL_VERIFIED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "KYC_CONFIRMED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DISABLED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INTERNATIONAL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DOMESTIC": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "JUST_CREATED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ACCEPTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "START_SEND_REQUEST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "WAIT_FOR_MINED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SUCCESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FAILED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REJECTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "JUST_CREATED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SUCCESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REJECTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PROCESSING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ACCEPTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "START_SEND_REQUEST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "WAIT_FOR_MINED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "FAILED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ROOT_USER_ID_IS_INVALID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "ROOT_USER_MUST_BELONG_TO_CURRENT_USER_SYSTEM": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "NUMBER_OF_LEVELS_FROM_ROOT_MUST_BE_POSITIVE_INTEGER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "NUMBER_OF_LEVELS_IS_OUT_OF_RANGE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_ROOT_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INCORRECT_CURRENT_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PASSWORD_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "OLD_PIN_CODE_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "NEW_PIN_CODE_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PIN_CODE_FORMAT": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_OLD_PIN_CODE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EMAIL_EXISTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_EMAIL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_FIRST_NAME": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_LAST_NAME": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_PRESENTER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_RESET_PASSWORD_CODE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "RESET_PASSWORD_CODE_EXPIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_EMAIL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PENDING": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANCELLED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "SUCCESS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EXPIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CURRENT_PASSWORD_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_CURRENT_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "TARGETED_USER_HAS_NOT_CONFIRMED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_NUMBER_OF_ITEMS_PER_PAGE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PAGE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_STATUS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_COIN_ID": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EMAIL_DOES_NOT_EXIST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "DISABLED_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_TOKEN": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_USER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_USER_STATUS": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "EMAIL_EXISTED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_EMAIL": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_FIRST_NAME": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_LAST_NAME": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_PRESENTER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "AFFILIATION_CODE_MUST_EXIST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PHONE_NUMBER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "COUNTRY_MUST_EXIST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "CANNOT_FIND_VERIFICATION_CODE": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "REGISTER_CODE_EXPIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PIN_CODE_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PASSWORD_IS_REQUIRED": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PIN_CODE_FORMAT": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "PIN_CODE_HAVE_BEEN_SET_ALREADY": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PASSWORD": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_FIRST_NAME": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_LAST_NAME": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "INVALID_PHONE_NUMBER": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
    "COUNTRY_MUST_EXIST": {
        "en-US": "",
        "vi-VN": "",
        "ja-JP": "",
        "th-TH": "",
        "id-ID": "",
        "ms-MY": "",
        "zh-CN": ""
    },
}

let temp = {}

console.log(Object.keys(obj).reduce((output, key) => {
    if (temp[key]) return output;
    else temp[key] = obj[key];
    return output;
}, {}))

fs.writeFile((`./temp.json`), JSON.stringify(temp, null, 4), function (err) {
    if (err) console.error(err)

    console.info('••••• Fetch dictionary successful.')
});