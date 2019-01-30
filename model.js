var country = {
    TSLA: "UK",
    GOOG: "US",
    MSFT: "US",
	SPOT: "EU",
	APPL: "US",
	NFLX: "US",
	HULU: "US",
	AAZN: "US",
	BLZD: "UK"
};

let liability = {
	TSLA: "plc",
    GOOG: "plc",
    MSFT: "ltd",
	SPOT: "ltd",
	APPL: "plc",
	NFLX: "plc",
	HULU: "ltd",
	AAZN: "plc",
	BLZD: "plc"
};

let industry = {
	TSLA: "auto",
    GOOG: "software",
    MSFT: "software",
	SPOT: "streaming",
	APPL: "software",
	NFLX: "streaming",
	HULU: "streaming",
	AAZN: "software",
	BLZD: "software"	
}

module.exports = {
	get: (org) => ({
		organisation: org,
		//country: org == "GOOG" ? (Math.floor(Math.random() * 1000) > 500 ? "UK" : "US"): country[org],
		country: country[org],
		liability: liability[org],
		industry: industry[org],
		price: Math.floor(Math.random() * 1000),
		employees: Math.floor(Math.random() * 1000),
		citiesOfOperation: Math.floor(Math.random() * 1000),
		time: new Date()
	})
}