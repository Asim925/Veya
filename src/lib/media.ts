/* ================================================================
   VEYA — IMAGE PLACEHOLDERS
   ----------------------------------------------------------------
   Every image used across the site is listed here. To swap in your
   own photography, replace any URL below (or drop files into
   /public/images and use paths like "/images/farmhouse.jpg").
   Current placeholders are licensed stock photos from Pexels.
   ================================================================ */

const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  // Hero collage
  heroEvent: px(15621210, 1000, 1200), // Event venue — banquet hall
  heroSports: px(15818644, 1000, 700), // Sports facility — indoor football
  heroCatering: px(17294719, 900, 700), // Catering / decor — buffet & florals
  heroHotel: px(6434592, 900, 700), // Hotel / workspace

  // Four main categories
  catEvents: px(33852450, 1200, 800),
  catCatering: px(16935999, 1200, 800),
  catSports: px(36230651, 1200, 800),
  catHospitality: px(261101, 1200, 800),

  // Large events gallery
  evFarmhouse: px(30229060),
  evMarriage: px(33852450),
  evBanquet: px(33852660),
  evRooftop: px(37844216),
  evGarden: px(14608923),
  evAuditorium: px(30838766),

  // Extra event venue photos (sample listings)
  evVilla: px(37732060),
  evTerrace: px(14262609),
  evIvory: px(15621210),
  evGrand: px(4717550),
  evChandelier: px(35985205),
  evMeadow: px(11845536),

  // Catering
  catFood: px(29486068),
  catDesserts: px(17001830),
  catBeverages: px(16807989),
  catServing: px(38036576),

  // Decoration
  decThemes: px(14703685),
  decFloral: px(19024676),
  decStage: px(30831640),
  decLighting: px(2020432),

  // Sports & recreation
  spCricket: px(31131696),
  spFutsal: px(15818644),
  spBasketball: px(7156048),
  spBadminton: px(8007493),
  spIndoor: px(5384156),
  spGaming: px(9072388),

  // Stay
  stHotel: px(6434592),
  stGuestHouse: px(31262576),
  stApartment: px(7587828),
  stVacation: px(29679172),
  stFarmhouse: px(18786201),

  // Work
  wkMeeting: px(31107362),
  wkOffice: px(7534168),
  wkConference: px(6949367),
  wkSeminar: px(3709370),

  // Campaign studio mockups
  campSocial: px(37844216, 1000, 1000),
  campSeasonal: px(4717550, 900, 1350),
} as const;
