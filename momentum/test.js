function getDayName( locale)
{
    var date = new Date();
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

var dateStr = '10/28/2020';
var day = getDayName("nl-NL");
console.log(day)
