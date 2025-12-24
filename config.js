export const calculatorConfig = {
    title: "מחשבון עלויות דלתות אש",
    subtitle: "כלי מקצועי לחישוב עלויות ייצור והרכבה",
    currency: "₪",
    categories: [
        {
            id: "profiles",
            name: "פרופילים",
            items: [
                {
                    id: "main_frame",
                    name: "משקוף",
                    manufacturer: "קליל",
                    price: 50,
                    unit: "מ' רץ",
                    formulaSingle: "height * 2 + width",
                    formulaDouble: "height * 2 + width",
                    mandatory: true
                },
                {
                    id: "leaf_profile",
                    name: "כנף",
                    manufacturer: "קליל",
                    price: 50,
                    unit: "מ' רץ",
                    formulaSingle: "(height + width) * 2",
                    formulaDouble: "(height + width) * 4",
                    mandatory: true
                },
                {
                    id: "glazing_bead",
                    name: "סרגל זיגוג",
                    manufacturer: "אלום-פלסט",
                    price: 15,
                    unit: "מ' רץ",
                    formulaSingle: "(height + width) * 2",
                    formulaDouble: "(height + width) * 4",
                    mandatory: true
                },
                {
                    id: "expanding_strip",
                    name: "סרט תופח",
                    manufacturer: "M3",
                    price: 10,
                    unit: "מ' רץ",
                    formulaSingle: "(height + width) * 2",
                    formulaDouble: "(height + width) * 4",
                    mandatory: true
                }
            ]
        },
        {
            id: "hardware",
            name: "פרזול ואביזרים",
            items: [
                {
                    id: "simple_panic_lock",
                    name: "מנעול פאניקה פשוט",
                    manufacturer: "Assa Abloy",
                    price: 286,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "1",
                    mandatory: true
                },
                {
                    id: "lock_counter",
                    name: "נגדי למנעול",
                    manufacturer: "Assa Abloy",
                    price: 23,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "1",
                    mandatory: true
                },
                {
                    id: "door_closer_dc340",
                    name: "מחזיר דלת DC340",
                    manufacturer: "Assa Abloy",
                    price: 580,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "2",
                    mandatory: true
                },
                {
                    id: "cylinder",
                    name: "צילינדר",
                    manufacturer: "Technica",
                    price: 30,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "1",
                    mandatory: true
                },
                {
                    id: "lever_handle",
                    name: "ידית מעבר עם רוזטה",
                    manufacturer: "Technica",
                    price: 45,
                    unit: "יחידה",
                    formulaSingle: "2",
                    formulaDouble: "2",
                    mandatory: true
                },
                {
                    id: "hinges",
                    name: "צירים",
                    manufacturer: "קליל",
                    price: 80,
                    unit: "יחידה",
                    formulaSingle: "3",
                    formulaDouble: "6",
                    mandatory: true
                },
                {
                    id: "panic_lock_el460",
                    name: "מנעול פאניקה EL460",
                    manufacturer: "Assa Abloy",
                    price: 2650,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "1",
                    mandatory: false
                },
                {
                    id: "electric_cable",
                    name: "כבל חשמלי להשחלה",
                    manufacturer: "Assa Abloy",
                    price: 227,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "1",
                    mandatory: false
                },
                {
                    id: "panic_bar",
                    name: "ידית בהלה (Panic Bar)",
                    manufacturer: "Assa Abloy",
                    price: 1000,
                    unit: "יחידה",
                    formulaSingle: "1",
                    formulaDouble: "2",
                    mandatory: false
                }
            ]
        },
        {
            id: "glass_and_finish",
            name: "זכוכית וגימור",
            items: [
                {
                    id: "fire_glass_18",
                    name: "זכוכית חסינת אש 18 מ\"מ",
                    manufacturer: "Pilkington",
                    price: 1000,
                    unit: "מ\"ר",
                    formulaSingle: "(width - 0.2) * (height - 0.2)",
                    formulaDouble: "((width / 2) - 0.2) * (height - 0.2) * 2",
                    mandatory: true
                },
                {
                    id: "painting",
                    name: "צביעה",
                    manufacturer: "מצבעה",
                    price: 200,
                    unit: "מ\"ר",
                    formulaSingle: "width * height * 2",
                    formulaDouble: "width * height * 2",
                    mandatory: true
                }
            ]
        }
    ],
    globalCosts: {
        manufacturing: {
            name: "עלות ייצור (עבודה)",
            single: 1000,
            double: 2000
        },
        installation: {
            name: "עלות התקנה בשטח",
            single: 2500,
            double: 3500
        }
    }
};
