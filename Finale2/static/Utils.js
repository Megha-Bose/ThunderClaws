var Utils = {
    getOrdinalSuffix: function (number) {
        let lastDigit = number % 10;
        let val = number % 100;
        if (lastDigit == 1 && val != 11) {
            return "st";
        } else if (lastDigit == 2 && val != 12) {
            return "nd";
        } else if (lastDigit == 3 && val != 13) {
            return "rd";
        } else {
            return "th";
        }
    },
    mod: function(a, b) {
        return ((a % b) + b) % b;
    }
}