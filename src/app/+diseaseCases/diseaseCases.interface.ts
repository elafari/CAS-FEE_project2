export interface DiseaseCase {
    name: string;
    type: string;
    active: boolean;
    patient: string;
    startDate?: string;
    endDate?: string;
}