export class StringUtils {
    static isEmail(text: string) {
        if (!text) return false;
        var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return re.test(text);
    }

    static isPhoneNumber(phone: string) {
        if (!phone) return false;
        return /^(\+?84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/.test(phone);
    }

    static isURL(str: string) {
        var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
        var url = new RegExp(urlRegex, 'i');
        return str.length < 2083 && url.test(str);
    }

    static limitCharacters(text: string, length: number, subfix = '...') {
        if (text.length <= +length) return text;
        let string = text.slice(0, length);
        string += subfix;
        return string;
    }

    static removeHtmlTags(string: string): string {
        try {
            if (!string) return '';
            return string.replace(/<\/?[^>]+(>|$)/g, "");
        } catch (error) {
            return '';
        }
    }

    /* 
        Secret address, transaction hash
    */
    static secretHex(text: string, first: number = 6, last: number = 4) {
        let len = text.length
        if (len <= 10) return text;
        let ret = `${text.substr(0, first)}...${text.substr(len-last, len)}`
        return ret;
    }
}