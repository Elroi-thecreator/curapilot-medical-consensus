// HarborView Hotel & TripSteward Sovereign Client Vault & UI Controller
// Operates 100% in browser memory. Coordinates decentralized travel bookings via Open Agentic Web.

export class TripStewardVault {
  constructor() {
    this.trips = {
      "trip-1": {
        id: "trip-1",
        code: "TRIP #TS-7492 (San Francisco Waterfront)",
        title: "Boutique Coastal Getaway & Sunset Sailing",
        traveler: { name: "Elena Rostova", party_size: 2, status: "Confirmed Traveler" },
        destination: "San Francisco, CA",
        dates: "Nov 27 – Nov 29 (2 Nights)",
        flight_details: "United Airlines UA 482 • SFO Arrival: Friday 4:30 PM",
        target_budget_usd: 600,
        preferences: [
          { category: "Lodging Style", value: "Boutique waterfront hotel, quiet room, late check-in" },
          { category: "Ground Transfer", value: "Executive airport pickup synced with flight arrival buffer" },
          { category: "Activities", value: "Scenic sunset catamaran sailing on the bay for 2 guests" }
        ],
        room_options: [
          { tier: "Deluxe Bay-View Queen", rate: 185, status: "AVAILABLE", view: "Panoramic Bay & Bridge View" },
          { tier: "Urban Executive Loft", rate: 220, status: "AVAILABLE", view: "Skyline & City Lights" },
          { tier: "Panoramic Harbor Penthouse", rate: 395, status: "AVAILABLE", view: "Private Wrap-Around Terrace" }
        ],
        demo_script: {
          prompt: "TripSteward Concierge, please coordinate Trip #TS-7492. Reserve a quiet room at HarborView under $200/night, coordinate a private airport transfer with CityGlide for my flight arriving at 4:30 PM, and book two sunset bay cruise tickets with MetroPass.",
          cityglide_response: "CityGlide Transfer Dispatch confirmed: Vehicle 'Executive EV Sedan' (Tesla Model S) assigned. Flight UA 482 tracked in real-time. Pickup locked for 5:15 PM at SFO Terminal 2 with 45-minute post-touchdown grace buffer. Direct transit time to HarborView: 28 mins. Fixed Fare: $45.00 USD (Ref: #RIDE-8492).",
          metropass_response: "MetroPass Experiences Curator confirmed: Reserved 2x VIP Tickets for 'Golden Gate Sunset Catamaran Sailing' on Saturday, Nov 28 at 5:45 PM. Priority boarding at Pier 39 included. Total Price: $100.00 USD (Ref: #PASS-3104).",
          itinerary: {
            trip_title: "San Francisco Autumn Waterfront Retreat",
            destination: "San Francisco, California",
            dates: "Nov 27 – Nov 29, 2026 (2 Nights)",
            total_cost_usd: 515.00,
            direct_savings_usd: 142.00,
            itinerary_highlights: [
              "🏨 HarborView Hotel: Deluxe Bay-View Queen (2 Nights @ $185/night = $370)",
              "🚗 CityGlide Transfer: Executive EV Sedan (SFO Terminal 2 to Hotel = $45)",
              "⛵ MetroPass Experience: 2x Sunset Catamaran Sailing Passes ($100)"
            ],
            concierge_notes: "Direct booking confirmed across all 3 independent provider nodes. 0% middleman booking fees. Digital passes and driver dispatch contact stored in your local session."
          }
        }
      },
      "trip-2": {
        id: "trip-2",
        code: "TRIP #TS-3104 (Seattle Waterfront & Coffee Culture)",
        title: "Pacific Northwest Urban & Culinary Tour",
        traveler: { name: "Marcus Chen", party_size: 1, status: "Solo Executive" },
        destination: "Seattle, WA",
        dates: "Dec 03 – Dec 06 (3 Nights)",
        flight_details: "Delta DL 219 • SEA Arrival: Thursday 11:15 AM",
        target_budget_usd: 800,
        preferences: [
          { category: "Lodging Style", value: "High-floor urban loft with dedicated workspace" },
          { category: "Ground Transfer", value: "Eco-hybrid transfer from Sea-Tac to Downtown" },
          { category: "Activities", value: "Pike Place VIP Culinary & Coffee Roastery Tour" }
        ],
        room_options: [
          { tier: "Urban Executive Loft", rate: 195, status: "AVAILABLE", view: "Space Needle & Sound View" },
          { tier: "Deluxe Bay-View Queen", rate: 175, status: "AVAILABLE", view: "Elliott Bay Waterfront" }
        ],
        demo_script: {
          prompt: "TripSteward Concierge, please coordinate Trip #TS-3104 for Seattle. Book the Urban Executive Loft, schedule a Sea-Tac pickup with CityGlide, and secure a spot on the Pike Place VIP Culinary Tour with MetroPass.",
          cityglide_response: "CityGlide Transfer Dispatch confirmed: Assigned 'Eco-Hybrid Chauffeur' for Sea-Tac pickup at 11:50 AM. Fixed Fare: $42.00 USD (Ref: #RIDE-5192).",
          metropass_response: "MetroPass Experiences Curator confirmed: Secured 1x VIP Pass for 'Pike Place Private Culinary & Coffee Experience' for Friday morning. Total Price: $65.00 USD (Ref: #PASS-9021).",
          itinerary: {
            trip_title: "Seattle Urban & Culinary Solo Retreat",
            destination: "Seattle, Washington",
            dates: "Dec 03 – Dec 06, 2026 (3 Nights)",
            total_cost_usd: 692.00,
            direct_savings_usd: 118.00,
            itinerary_highlights: [
              "🏨 HarborView Urban Loft: 3 Nights @ $195/night = $585",
              "🚗 CityGlide Eco-Hybrid Transfer: Sea-Tac to Hotel = $42",
              "☕ MetroPass VIP Culinary Experience: Pike Place Market Pass = $65"
            ],
            concierge_notes: "All bookings verified directly with Seattle providers without third-party commission surcharges."
          }
        }
      },
      "trip-3": {
        id: "trip-3",
        code: "TRIP #TS-5519 (Austin Live Music & Arts)",
        title: "Austin Downtown South Congress Getaway",
        traveler: { name: "Sarah & David Miller", party_size: 2, status: "Confirmed Travelers" },
        destination: "Austin, TX",
        dates: "Dec 11 – Dec 13 (2 Nights)",
        flight_details: "American Airlines AA 1084 • AUS Arrival: Friday 2:30 PM",
        target_budget_usd: 700,
        preferences: [
          { category: "Lodging Style", value: "Boutique suite near downtown live music district" },
          { category: "Ground Transfer", value: "Private airport SUV transfer from AUS Bergstrom" },
          { category: "Activities", value: "Austin Historic Live Music & Speakeasy Tour" }
        ],
        room_options: [
          { tier: "Deluxe Bay-View Queen", rate: 190, status: "AVAILABLE", view: "Lady Bird Lake" },
          { tier: "Panoramic Harbor Penthouse", rate: 350, status: "AVAILABLE", view: "Skyline Panorama" }
        ],
        demo_script: {
          prompt: "TripSteward Concierge, review Trip #TS-5519. Book our 2-night Austin stay, schedule an AUS airport pickup with CityGlide, and book 2 passes for the Austin Live Music Tour with MetroPass.",
          cityglide_response: "CityGlide Transfer Dispatch confirmed: Assigned 'Luxury SUV Transfer' for AUS pickup at 3:10 PM. Fixed Fare: $48.00 USD (Ref: #RIDE-7714).",
          metropass_response: "MetroPass Experiences Curator confirmed: Secured 2x Tickets for 'Austin Historic Live Music & Speakeasy Walk' for Friday at 8:00 PM. Total Price: $80.00 USD (Ref: #PASS-4412).",
          itinerary: {
            trip_title: "Austin Live Music & Cultural Weekend",
            destination: "Austin, Texas",
            dates: "Dec 11 – Dec 13, 2026 (2 Nights)",
            total_cost_usd: 508.00,
            direct_savings_usd: 125.00,
            itinerary_highlights: [
              "🏨 HarborView Suite: 2 Nights @ $190/night = $380",
              "🚗 CityGlide Luxury SUV Transfer: AUS to Downtown = $48",
              "🎸 MetroPass Live Music Experience: 2x Speakeasy Passes = $80"
            ],
            concierge_notes: "Direct booking verified. Instant digital passes and transfer contact saved in browser session."
          }
        }
      }
    };

    this.activeTripId = "trip-1";
    this.hotelReservation = null;
    this.airportTransfer = null;
    this.cityExperience = null;
    this.masterItinerary = null;
    this.simulating = false;
  }

  getActiveTrip() {
    const t = this.trips[this.activeTripId];
    return {
      trip_id: t.code,
      title: t.title,
      traveler: t.traveler,
      destination: t.destination,
      dates: t.dates,
      flight_details: t.flight_details,
      target_budget_usd: t.target_budget_usd,
      preferences: t.preferences,
      room_options: t.room_options,
      confirmed_hotel: this.hotelReservation,
      confirmed_transfer: this.airportTransfer,
      confirmed_experience: this.cityExperience
    };
  }

  setActiveTrip(tripId) {
    if (this.trips[tripId]) {
      this.activeTripId = tripId;
      this.hotelReservation = null;
      this.airportTransfer = null;
      this.cityExperience = null;
      this.masterItinerary = null;
      TripStewardApp.render();
    }
  }

  reserveHotelRoom(room) {
    this.hotelReservation = {
      id: "STAY-" + Math.floor(10000 + Math.random() * 90000),
      timestamp: new Date().toLocaleTimeString(),
      status: "RESERVED_DIRECT",
      ...room
    };
    TripStewardApp.renderBookings();
    return {
      ok: true,
      reservation_id: this.hotelReservation.id,
      total_stay_cost: room.nightly_rate_usd * room.nights,
      message: `HarborView room '${room.room_tier}' successfully reserved for ${room.nights} nights.`
    };
  }

  bookAirportTransfer(transfer) {
    this.airportTransfer = {
      id: "RIDE-" + Math.floor(10000 + Math.random() * 90000),
      timestamp: new Date().toLocaleTimeString(),
      status: "DISPATCHED_ON_NETWORK",
      ...transfer
    };
    TripStewardApp.renderBookings();
    return {
      ok: true,
      transfer_booking_id: this.airportTransfer.id,
      fare_usd: transfer.fare_usd,
      message: `CityGlide ${transfer.vehicle_class} transfer scheduled for ${transfer.pickup_time}.`
    };
  }

  bookCityExperience(exp) {
    this.cityExperience = {
      id: "PASS-" + Math.floor(10000 + Math.random() * 90000),
      timestamp: new Date().toLocaleTimeString(),
      status: "CONFIRMED_VOUCHER_ISSUED",
      ...exp
    };
    TripStewardApp.renderBookings();
    return {
      ok: true,
      experience_pass_id: this.cityExperience.id,
      total_price_usd: exp.total_price_usd,
      message: `MetroPass confirmed ${exp.tickets_count}x tickets for '${exp.experience_name}'.`
    };
  }

  compileMasterItinerary(itinerary) {
    this.masterItinerary = {
      generated_at: new Date().toISOString(),
      trip_code: this.trips[this.activeTripId].code,
      ...itinerary
    };
    TripStewardApp.renderItinerary();
    return {
      ok: true,
      status: "COMMITTED_TO_CLIENT_SESSION",
      itinerary_id: "ITIN-" + Math.floor(100000 + Math.random() * 900000),
      message: "Unified Master Travel Itinerary synthesized and sealed with direct provider savings."
    };
  }

  runDemoSimulation() {
    if (this.simulating) return;
    this.simulating = true;
    const t = this.trips[this.activeTripId];
    const demo = t.demo_script;

    TripStewardApp.appendSimulatedMessage("user", demo.prompt);

    setTimeout(() => {
      TripStewardApp.appendSimulatedMessage("bot", `🛎️ **Travel Concierge:** Initiating Open Agentic Web trip coordination for ${t.code}... Reading traveler preferences in local memory. Checking HarborView direct room availability...`);
      
      // Reserve Room
      this.reserveHotelRoom({
        room_tier: t.room_options[0].tier,
        nightly_rate_usd: t.room_options[0].rate,
        nights: 2,
        guest_names: t.traveler.name,
        amenities_included: ["Waterfront View", "High-Speed Wi-Fi", "Late Check-out 1 PM", "Artisan Coffee Bar"]
      });
    }, 600);

    setTimeout(() => {
      TripStewardApp.appendSimulatedMessage("transfer", `🚗 **CityGlide Airport Transfer (` + window.location.origin + `/rides):** ${demo.cityglide_response}`);
      
      // Book Airport Transfer
      this.bookAirportTransfer({
        pickup_location: t.flight_details,
        dropoff_location: "HarborView Hotel, 450 Waterfront Blvd",
        vehicle_class: "Executive EV Sedan (Tesla Model S)",
        pickup_time: "5:15 PM (Synced with flight arrival)",
        fare_usd: 45.00
      });
    }, 1800);

    setTimeout(() => {
      TripStewardApp.appendSimulatedMessage("experiences", `⛵ **MetroPass Experiences (` + window.location.origin + `/experiences):** ${demo.metropass_response}`);
      
      // Book Experience
      this.bookCityExperience({
        experience_name: "Golden Gate Sunset Catamaran Cruise",
        scheduled_slot: "Saturday, 5:45 PM – 7:30 PM",
        tickets_count: t.traveler.party_size,
        total_price_usd: 100.00,
        special_notes: "Arrive at Pier 39 gate B 15 minutes prior. Digital QR pass verified."
      });
    }, 3200);

    setTimeout(() => {
      TripStewardApp.appendSimulatedMessage("bot", `🛎️ **Travel Concierge:** All direct bookings confirmed across the 3 independent websites! 0% aggregator markups applied. Synthesizing your sealed Master Travel Itinerary Pass...`);
      this.compileMasterItinerary(demo.itinerary);
      this.simulating = false;
    }, 4500);
  }
}

export class TripStewardApp {
  static vault = new TripStewardVault();

  static init() {
    TripStewardApp.bindEvents();
    TripStewardApp.render();
  }

  static bindEvents() {
    const tripSelect = document.querySelector("#trip-selector");
    if (tripSelect) {
      tripSelect.addEventListener("change", (e) => {
        TripStewardApp.vault.setActiveTrip(e.target.value);
      });
    }

    const demoSimBtn = document.querySelector("#demo-simulate-btn");
    if (demoSimBtn) {
      demoSimBtn.addEventListener("click", () => {
        TripStewardApp.vault.runDemoSimulation();
      });
    }

    const prefillBtn = document.querySelector("#demo-prefill-btn");
    if (prefillBtn) {
      prefillBtn.addEventListener("click", () => {
        const t = TripStewardApp.vault.trips[TripStewardApp.vault.activeTripId];
        const input = document.querySelector("#ns-query-input") || document.querySelector("input[type='text'].ns-input");
        if (input) {
          input.value = t.demo_script.prompt;
          input.focus();
        } else {
          navigator.clipboard.writeText(t.demo_script.prompt);
          alert("Copied sample prompt to clipboard! Paste it into the concierge chat below.");
        }
      });
    }

    const resetBtn = document.querySelector("#demo-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        TripStewardApp.vault.setActiveTrip(TripStewardApp.vault.activeTripId);
        const chatMsgs = document.querySelector("#ns-msgs");
        if (chatMsgs) {
          chatMsgs.innerHTML = `<div class="ns-msg bot">I am your autonomous Travel Concierge. I operate 100% in your local browser to coordinate room reservations, airport transfers, and activity passes directly across independent websites on your behalf. How can I assist with your journey?</div>`;
        }
      });
    }

    const exportBtn = document.querySelector("#export-itinerary-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        if (!TripStewardApp.vault.masterItinerary) {
          alert("No Master Itinerary compiled yet. Run the trip coordination deliberation first!");
          return;
        }
        TripStewardApp.downloadItineraryText();
      });
    }

    // Custom Trip Modal Handlers
    const modal = document.querySelector("#custom-trip-modal");
    const openBtn = document.querySelector("#custom-trip-btn");
    const closeBtn = document.querySelector("#close-modal-btn");
    const cancelBtn = document.querySelector("#cancel-modal-btn");
    const form = document.querySelector("#custom-trip-form");

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => modal.showModal());
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.close());
    }

    if (cancelBtn && modal) {
      cancelBtn.addEventListener("click", () => modal.close());
    }

    if (form && modal) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const codeVal = document.querySelector("#cust-code")?.value.trim() || "TRIP #TS-CUSTOM";
        const travelerVal = document.querySelector("#cust-traveler")?.value.trim() || "Alex Mercer";
        const destVal = document.querySelector("#cust-destination")?.value.trim() || "San Francisco, CA";
        const datesVal = document.querySelector("#cust-dates")?.value.trim() || "Next Weekend (2 Nights)";
        const flightVal = document.querySelector("#cust-flight")?.value.trim() || "Flight SFO-101 • Friday 3:00 PM";
        const budgetVal = parseFloat(document.querySelector("#cust-budget")?.value) || 500;
        const notesVal = document.querySelector("#cust-notes")?.value.trim() || "Quiet boutique room, airport pickup, sunset activity.";

        const customTrip = {
          id: "trip-custom",
          code: codeVal,
          title: `Custom Trip to ${destVal}`,
          traveler: { name: travelerVal, party_size: 2, status: "Active Inquiry" },
          destination: destVal,
          dates: datesVal,
          flight_details: flightVal,
          target_budget_usd: budgetVal,
          preferences: [
            { category: "Traveler Request", value: notesVal },
            { category: "Flight Arrival", value: flightVal }
          ],
          room_options: [
            { tier: "Deluxe Bay-View Queen", rate: 180, status: "AVAILABLE", view: "Waterfront View" },
            { tier: "Urban Executive Loft", rate: 210, status: "AVAILABLE", view: "City View" }
          ],
          demo_script: {
            prompt: `TripSteward Concierge, coordinate ${codeVal} for ${destVal} (${datesVal}). Reserve a room under $200/night, book an airport ride with CityGlide for ${flightVal}, and book activity passes with MetroPass.`,
            cityglide_response: `CityGlide Transfer Dispatch confirmed: Assigned Executive EV Sedan for pickup at ${destVal} airport. Fare: $45.00 USD (Ref: #RIDE-CUST).`,
            metropass_response: `MetroPass Experiences Curator confirmed: Reserved 2x Cultural City Passes. Total: $90.00 USD (Ref: #PASS-CUST).`,
            itinerary: {
              trip_title: `Custom ${destVal} Getaway`,
              destination: destVal,
              dates: datesVal,
              total_cost_usd: 495.00,
              direct_savings_usd: 130.00,
              itinerary_highlights: [
                `🏨 HarborView Deluxe Room (2 Nights): $360`,
                `🚗 CityGlide Airport Chauffeur: $45`,
                `🎟️ MetroPass Experience Passes: $90`
              ],
              concierge_notes: "Custom itinerary coordinated directly with independent service providers."
            }
          }
        };

        TripStewardApp.vault.trips["trip-custom"] = customTrip;

        // Ensure option exists in selector
        const selector = document.querySelector("#trip-selector");
        if (selector) {
          let opt = selector.querySelector("option[value='trip-custom']");
          if (!opt) {
            opt = document.createElement("option");
            opt.value = "trip-custom";
            selector.appendChild(opt);
          }
          opt.textContent = `${codeVal} — ${destVal} (Custom In-Memory Trip)`;
          selector.value = "trip-custom";
        }

        TripStewardApp.vault.setActiveTrip("trip-custom");
        modal.close();
      });
    }
  }

  static appendSimulatedMessage(role, text) {
    const chatMsgs = document.querySelector("#ns-msgs");
    if (!chatMsgs) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `ns-msg ${role} sim-msg-${role}`;
    msgDiv.innerHTML = text.replace(/\n/g, "<br>");
    chatMsgs.appendChild(msgDiv);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  static render() {
    const t = TripStewardApp.vault.trips[TripStewardApp.vault.activeTripId];
    if (!t) return;

    // Header info
    const tripTitle = document.querySelector("#active-trip-title");
    const tripTraveler = document.querySelector("#active-trip-traveler");
    const tripDestination = document.querySelector("#active-trip-destination");

    if (tripTitle) tripTitle.textContent = t.code + " — " + t.title;
    if (tripTraveler) {
      tripTraveler.textContent = `Traveler: ${t.traveler.name} (${t.traveler.party_size} Guests) • Budget: $${t.target_budget_usd} USD`;
    }
    if (tripDestination) {
      tripDestination.textContent = `Destination: ${t.destination} • Dates: ${t.dates} • ${t.flight_details}`;
    }

    // Preferences List
    const prefContainer = document.querySelector("#preferences-list");
    if (prefContainer) {
      prefContainer.innerHTML = t.preferences.map(p => `
        <div class="pref-row">
          <span class="pref-cat">${p.category}</span>
          <span class="pref-val"><strong>${p.value}</strong></span>
        </div>
      `).join("");
    }

    // Room Inventory
    const roomContainer = document.querySelector("#room-inventory-list");
    if (roomContainer) {
      roomContainer.innerHTML = t.room_options.map(r => `
        <div class="room-pill">
          <div class="room-tier">${r.tier}</div>
          <div class="room-view">${r.view}</div>
          <div class="room-rate"><strong>$${r.rate}</strong> / night <span class="badge-avail">Direct Rate</span></div>
        </div>
      `).join("");
    }

    TripStewardApp.renderBookings();
    TripStewardApp.renderItinerary();
  }

  static renderBookings() {
    const container = document.querySelector("#confirmed-bookings-container");
    const countBadge = document.querySelector("#bookings-count-badge");
    if (!container) return;

    const hotel = TripStewardApp.vault.hotelReservation;
    const transfer = TripStewardApp.vault.airportTransfer;
    const exp = TripStewardApp.vault.cityExperience;

    const count = (hotel ? 1 : 0) + (transfer ? 1 : 0) + (exp ? 1 : 0);
    if (countBadge) {
      countBadge.textContent = `${count} Confirmed Direct`;
      countBadge.style.display = count > 0 ? "inline-block" : "none";
    }

    if (count === 0) {
      container.innerHTML = `<div class="empty-state">No direct provider reservations committed yet. When the concierge reserves hotel rooms, airport rides, or activity passes, they will appear here.</div>`;
      return;
    }

    let html = "";
    if (hotel) {
      html += `
        <div class="booking-card hotel-booking">
          <div class="booking-top">
            <span class="booking-tag hotel">🏨 HOTEL RESERVED</span>
            <span class="booking-ref">#${hotel.id}</span>
            <span class="booking-time">${hotel.timestamp}</span>
          </div>
          <h4 class="booking-title">${hotel.room_tier} @ HarborView</h4>
          <div class="booking-meta">2 Nights • $${hotel.nightly_rate_usd}/night • Guest: ${hotel.guest_names}</div>
          <div class="booking-perks">Perks: ${hotel.amenities_included.join(", ")}</div>
        </div>
      `;
    }
    if (transfer) {
      html += `
        <div class="booking-card transfer-booking">
          <div class="booking-top">
            <span class="booking-tag transfer">🚗 AIRPORT TRANSFER BOOKED</span>
            <span class="booking-ref">#${transfer.id}</span>
            <span class="booking-time">${transfer.timestamp}</span>
          </div>
          <h4 class="booking-title">${transfer.vehicle_class} (CityGlide)</h4>
          <div class="booking-meta">${transfer.pickup_location} ➡️ ${transfer.dropoff_location}</div>
          <div class="booking-perks">Pickup: <strong>${transfer.pickup_time}</strong> • Fixed Fare: <strong>$${transfer.fare_usd.toFixed(2)}</strong> (Flight-Tracked)</div>
        </div>
      `;
    }
    if (exp) {
      html += `
        <div class="booking-card exp-booking">
          <div class="booking-top">
            <span class="booking-tag exp">⛵ EXPERIENCE PASS SECURED</span>
            <span class="booking-ref">#${exp.id}</span>
            <span class="booking-time">${exp.timestamp}</span>
          </div>
          <h4 class="booking-title">${exp.experience_name} (MetroPass)</h4>
          <div class="booking-meta">${exp.tickets_count}x VIP Admission Passes • Slot: ${exp.scheduled_slot}</div>
          <div class="booking-perks">Total: <strong>$${exp.total_price_usd.toFixed(2)}</strong> • ${exp.special_notes}</div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  static renderItinerary() {
    const container = document.querySelector("#itinerary-output");
    if (!container) return;

    const d = TripStewardApp.vault.masterItinerary;
    if (!d) {
      container.innerHTML = `
        <div class="empty-itinerary">
          <p>Master Itinerary Pass not yet compiled.</p>
          <small>Ask the Travel Concierge to coordinate the journey or click "⚡ 1-Click Trip Coordination" above.</small>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="itinerary-card">
        <div class="itinerary-header">
          <div class="itinerary-tag">SEALED DIGITAL TRAVEL PASS</div>
          <h3>${d.trip_title}</h3>
          <div class="itinerary-meta">
            Destination: ${d.destination} • Dates: ${d.dates}
            • Timestamp: ${new Date(d.generated_at).toLocaleString()}
          </div>
        </div>

        <div class="itinerary-body">
          <div class="itinerary-pricing">
            <div class="price-box">
              <span class="price-label">Total Cost (Direct Provider Pricing)</span>
              <span class="price-val">$${d.total_cost_usd.toFixed(2)} USD</span>
            </div>
            <div class="savings-box">
              <span class="savings-label">Direct Provider Savings</span>
              <span class="savings-val">🎉 -$${d.direct_savings_usd.toFixed(2)} saved</span>
              <small>(0% OTA commission markup)</small>
            </div>
          </div>

          <div class="itinerary-section">
            <h4>📋 Confirmed Direct Bookings Across Open Agentic Web</h4>
            <ul>
              ${d.itinerary_highlights.map(i => `<li>${i}</li>`).join("")}
            </ul>
          </div>

          <div class="itinerary-section concierge-sec">
            <h4>🛎️ Travel Concierge Notes</h4>
            <p>${d.concierge_notes}</p>
          </div>
        </div>
      </div>
    `;
  }

  static downloadItineraryText() {
    const d = TripStewardApp.vault.masterItinerary;
    if (!d) return;

    const content = `=====================================================
TRIPSTEWARD MASTER DIGITAL TRAVEL PASS
Trip: ${d.trip_code}
Generated: ${new Date(d.generated_at).toLocaleString()}
Direct Provider Total: $${d.total_cost_usd.toFixed(2)} USD
Estimated Intermediary Savings: $${d.direct_savings_usd.toFixed(2)} USD
=====================================================

CURATED JOURNEY:
${d.trip_title} (${d.destination})
Dates: ${d.dates}

CONFIRMED DIRECT RESERVATIONS:
${d.itinerary_highlights.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}

CONCIERGE ARRIVAL BRIEFING:
${d.concierge_notes}

=====================================================
FEDERATED OPEN AGENTIC WEB VERIFICATION:
• HarborView Hotel: https://pnrs.is-a.dev/tripsteward/
• CityGlide Transfer: https://pnrs.is-a.dev/rides/
• MetroPass Experiences: https://pnrs.is-a.dev/experiences/
Zero middleman platform commission • 100% In-Browser Execution
=====================================================`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TripSteward_Itinerary_${d.trip_code.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  TripStewardApp.init();
});
