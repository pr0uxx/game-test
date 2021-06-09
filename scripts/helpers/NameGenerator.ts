import { NumberHelper } from "./NumberHelper"

export class NameGenerator {
    static firstNames = [
        "Ana",
        "Heath",
        "Mariam",
        "Jaylene",
        "Nathaniel",
        "Theresa",
        "Karissa",
        "Tiara",
        "Amiah",
        "Carolyn",
        "Kenzie",
        "Stephen",
        "Skyler",
        "Jesus",
        "Jaylen",
        "Kasey",
        "Uriel",
        "Aryana",
        "Hillary",
        "Keith",
        "Avery",
        "Jayla",
        "Gwendolyn",
        "Alberto",
        "Josue"
    ]

    static surnames = [
        "Novak",
        "Leblank",
        "Davies",
        "Monroe",
        "Farley",
        "McDowell",
        "Meza",
        "Werner",
        "Maxwell",
        "Wilson",
        "Nguyen",
        "Hoffman",
        "Knapp",
        "Dennis",
        "Burch",
        "Travis",
        "Tucker",
        "Erickson",
        "Kidd",
        "Walton",
        "Flowers",
        "Santiago",
        "Hardin",
        "Hahn",
        "Vaughan"
    ]

    static generate(): { firstName: string, surname: string } {
        return {
            firstName: this.firstNames[NumberHelper.getRandomInt(0, this.firstNames.length)],
            surname: this.surnames[NumberHelper.getRandomInt(0, this.surnames.length)]
        }
    }

}