// CSS colors
const css_colors = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen"
]


export default {
    async fetch(request, env, ctx) {
        var url = new URL(request.url);
        if (/\/progress\/\d+(\.\d+)?(\/(\d+(\.\d+)?)?)/i.test(url.pathname)) {
            url.pathname = url.pathname.slice(9);
            if (url.pathname.includes("/") && !url.pathname.endsWith("/"))
                var percentage = parseFloat(url.pathname.split("/")[1]) / parseFloat(url.pathname.split("/")[2]) * 100;
            else
                var percentage = parseFloat(url.pathname.slice(1));
            var fixed = url.searchParams.get("fixed") || "1";
            if (fixed)
                percentage = parseFloat(percentage.toFixed(parseInt(fixed)))
            if (percentage < 0)
                percentage = 0;
            if (percentage > 100)
                percentage = 100;
            var width = parseFloat(url.searchParams.get("width")) || 90;
            if (width < 0)
                width = 0;
            var bg = url.searchParams.get("bg") || "gray";
            if (!css_colors.includes(bg))
                bg = "#" + bg;
            var fg = url.searchParams.get("fg") || "white";
            if (!css_colors.includes(fg))
                fg = "#" + fg;
            var color = url.searchParams.get("color") || "green";
            if (!css_colors.includes(color))
                color = "#" + color;
            var svg = `<svg width="${width.toString()}" height="20" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="a" x2="0" y2="100%">
          <stop offset="0" stop-color="#bbb" stop-opacity=".2"/>
          <stop offset="1" stop-opacity=".1"/>
        </linearGradient>
        <rect rx="4" x="0" width="100%" height="20" fill=${JSON.stringify(bg)}/>
        <rect rx="4" x="0" width="${percentage.toString()}%" height="20" fill=${JSON.stringify(color)}/>
        <rect rx="4" width="100%" height="20" fill="url(#a)"/>
        <g fill=${JSON.stringify(fg)} text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <text x="50%" y="14">${percentage.toString()}%</text>
        </g>
      </svg>`
            var header = new Headers();
            header.append("Access-Control-Allow-Origin", "*");
            header.append("Content-Type", "image/svg+xml");
            return new Response(svg, { headers: header });
        }
        return new Response("", { status: 404 })
    },
};
