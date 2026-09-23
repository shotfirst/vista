// Dated quotes supplied for Vista 1.4. These are snapshots, not a live booking API.
(function(){
  "use strict";
  var flightRead = "23 Sep 2026 at 5:24 PM Eastern";
  var hotelRead = "23 Sep 2026 at 4:55 PM Eastern";
  var carRead = "23 Sep 2026 at 5:03 PM Eastern";
  var attractionRead = "23 Sep 2026 at 4:59 PM Eastern";
  var one = "one source, not confirmed";
  var two = "confirmed by two sources";
  var flightEarlier = "CA$2,280 to CA$2,820 for six budget flights, from the earlier switch estimate.";
  var suiteEarlier = "CA$420 to CA$640 per night for a suite (CA$4,200 to CA$6,400 for ten nights).";
  var roomsEarlier = "CA$320 to CA$470 per night for two rooms (CA$3,200 to CA$4,700 for ten nights).";
  var tusayanEarlier = "CA$1,400 to CA$2,100 for the earlier South Rim two-night trip, including hotel, entry and fuel, not a room-only quote.";
  var groups = [
    {
      title: "Nonstop flights · Toronto Pearson to Las Vegas · 2 to 12 Dec · 4 adults, children aged 11 and 3",
      quotes: [
        {name:"Air Canada · Basic Economy · round trip", amount:"CA$3,285 total for all six (about CA$548 per person)", source:"Google Flights and Kayak", read:flightRead, status:two, earlier:flightEarlier,
          detail:"Google Flights says required taxes and fees are included for six passengers. Carry-on and checked bags on Basic Economy not confirmed, check the airline's fare rules."},
        {name:"Porter · reference fare", amount:"About CA$3,569 total for six", source:"Kayak", read:flightRead, status:one, earlier:flightEarlier},
        {name:"Porter · reference fare", amount:"About CA$3,758 total for six", source:"Google Flights", read:flightRead, status:one, earlier:flightEarlier},
        {name:"Air Transat · reference fare", amount:"CA$3,998 total for six", source:"Kayak", read:flightRead, status:one, earlier:flightEarlier}
      ]
    },
    {
      title: "Las Vegas suites with kitchens · 2 to 12 Dec · 10 nights · 4 adults, children aged 11 and 3",
      note: "Two-bedroom layouts are not confirmed. Taxes and resort fees are not confirmed as included.",
      quotes: [
        {name:"Hilton Grand Vacations Club on the Las Vegas Strip", amount:"CA$5,018 stay total", source:"trivago Book & Go via Trivago", read:hotelRead, status:one, earlier:suiteEarlier},
        {name:"Jockey Club", amount:"CA$3,430 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:suiteEarlier},
        {name:"Home2 Suites Las Vegas Stadium District", amount:"CA$2,348 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:suiteEarlier},
        {name:"Home2 Suites Las Vegas Strip South", amount:"CA$2,771 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:suiteEarlier},
        {name:"Homewood Suites Las Vegas Airport", amount:"CA$3,487 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:suiteEarlier}
      ]
    },
    {
      title: "Las Vegas family hotels · two standard rooms with parking · 2 to 12 Dec",
      note: "It is not confirmed whether each total covers both rooms or one room; a one-room price could double. Taxes and resort fees are not confirmed as included.",
      quotes: [
        {name:"The Orleans", amount:"CA$2,327 stay total", source:"trivago Book & Go via Trivago", read:hotelRead, status:one, earlier:roomsEarlier},
        {name:"Rio", amount:"CA$2,619 stay total", source:"trivago Book & Go via Trivago", read:hotelRead, status:one, earlier:roomsEarlier},
        {name:"Sahara", amount:"CA$2,883 stay total", source:"trivago Book & Go via Trivago", read:hotelRead, status:one, earlier:roomsEarlier},
        {name:"Tuscany Suites", amount:"CA$3,238 stay total", source:"trivago Book & Go via Trivago", read:hotelRead, status:one, earlier:roomsEarlier},
        {name:"Circus Circus", amount:"CA$2,670 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:roomsEarlier}
      ]
    },
    {
      title: "Tusayan, Arizona · two rooms · 7 to 9 Dec",
      note: "Not confirmed whether each quoted total covers both rooms. Taxes and resort fees are not confirmed as included.",
      quotes: [
        {name:"Grand Canyon Plaza Hotel", amount:"CA$690 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:tusayanEarlier},
        {name:"The Grand Hotel at the Grand Canyon", amount:"CA$777 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:tusayanEarlier},
        {name:"Holiday Inn Resort The Squire", amount:"CA$796 stay total", source:"Hotels.com via Trivago", read:hotelRead, status:one, earlier:tusayanEarlier}
      ]
    },
    {
      title: "Minivan · Harry Reid airport · 2 to 12 Dec",
      quotes: [
        {name:"Minivan · Chrysler Pacifica or similar at the low end", amount:"CA$881 (VIP Cars) to CA$1,085 (Hertz)", source:"VIP Cars and Hertz via Kayak", read:carRead, status:one,
          earlier:"CA$1,540 to CA$2,090 for the planner's earlier eleven-day minivan allowance, which assumed a child seat and taxes.",
          detail:"A child seat for the 3-year-old is extra. Airport fees and taxes are not confirmed as included.",
          own:"David's own estimate, not a quote: with his corporate discount code and his own insurance, about 30 percent lower, roughly CA$617 to CA$760."}
      ]
    },
    {
      title: "Attractions · official-page USD prices",
      note: "Taxes and fees were not shown on the official pages.",
      quotes: [
        {name:"Grand Canyon West · All Access Pass", amount:"$99 USD per adult · $396 USD for four adults", source:"Grand Canyon West official page", read:attractionRead, status:one,
          earlier:"CA$470 to CA$620 for the family, the earlier planning range on the place card.",
          detail:"Kai (11) is free with a full-price adult All Access Pass, up to two children aged 5 to 12, only if bought in person at Grand Canyon West, not online. Keo (3) is always free."},
        {name:"Shark Reef Aquarium · timed entry", amount:"$29 USD per adult · $24 USD per child aged 5 to 12 · $140 USD for the family", source:"Shark Reef Aquarium official page", read:attractionRead, status:one,
          earlier:"CA$120 to CA$150 for the family, the earlier planning range on the place card.",
          detail:"Children under 5 enter free. Availability for 7 to 10 Dec was not checked."},
        {name:"Shark Reef Aquarium · anytime tickets", amount:"$36 USD per adult · $31 USD per child aged 5 to 12 · $175 USD for the family", source:"Shark Reef Aquarium official page", read:attractionRead, status:one,
          earlier:"CA$120 to CA$150 for the family, the earlier planning range on the place card.",
          detail:"Children under 5 enter free. Availability for 7 to 10 Dec was not checked."}
      ]
    }
  ];
  window.VISTA_ATTRACTION_QUOTES = {gcw:groups[5].quotes[0], shark:groups[5].quotes[1]};

  function line(parent, element, className, text){
    var child = document.createElement(element);
    child.className = className;
    child.textContent = text;
    parent.appendChild(child);
    return child;
  }
  var root = document.getElementById("priceReads");
  if(!root) return;
  root.textContent = "";
  groups.forEach(function(group){
    var section = document.createElement("div");
    section.className = "price-group";
    line(section, "h3", "", group.title);
    if(group.note) line(section, "p", "small", group.note);
    var grid = document.createElement("div");
    grid.className = "price-grid";
    group.quotes.forEach(function(q){
      var item = document.createElement("article");
      item.className = "price-item";
      line(item, "h4", "", q.name);
      line(item, "p", "price-amount", q.amount);
      line(item, "p", "price-source", "Source: "+q.source);
      line(item, "p", "price-time", "Price read on "+q.read);
      line(item, "span", "price-status", q.status);
      if(q.detail) line(item, "p", "price-detail", q.detail);
      if(q.own) line(item, "p", "price-detail", q.own);
      line(item, "p", "price-earlier", "earlier estimate: "+q.earlier);
      grid.appendChild(item);
    });
    section.appendChild(grid);
    root.appendChild(section);
  });
})();