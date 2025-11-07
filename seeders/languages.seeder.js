"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedLanguages = void 0;
const language_model_1 = require("../models/language.model");
const constants_1 = require("./constants");
const seedLanguages = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield connection.transaction();
    try {
        // Check if languages already exist
        const existingLanguagesCount = yield language_model_1.Language.count({ transaction });
        if (existingLanguagesCount > 0) {
            console.log(`Languages already exist (${existingLanguagesCount} records). Skipping language seeding.`);
            yield transaction.commit();
            return;
        }
        console.log('No languages found. Starting language seeding...');
        // Prepare language data
        const languagesToSeed = constants_1.DEFAULT_LANGUAGES.map((language) => {
            return {
                name: language.name,
                logo_url: language.icon,
                category: language.category,
                is_deleted: false,
            };
        });
        // Bulk create with updateOnDuplicate
        yield language_model_1.Language.bulkCreate(languagesToSeed, {
            transaction,
            updateOnDuplicate: ['name', 'logo_url', 'category', 'is_deleted', 'updated_at']
        });
        console.log(`Bulk processed ${constants_1.DEFAULT_LANGUAGES.length} languages successfully`);
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        console.log("Error seeding languages: ", error);
        throw error;
    }
});
exports.seedLanguages = seedLanguages;
