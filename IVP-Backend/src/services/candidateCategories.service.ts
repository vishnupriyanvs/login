import { CandidateCategory } from '../models/candidateCategories'


export class CandidateCategoryService {

    /* To get the list of all categories*/
    getAllCategories() {
        return CandidateCategory.findAll()
    }

    createCategory(category: any) {
        var newCategory = new CandidateCategory(category);
        return newCategory.save();
    }

    findByCategoryId(id: number) {
        return CandidateCategory.findByPk(id);
    }


}