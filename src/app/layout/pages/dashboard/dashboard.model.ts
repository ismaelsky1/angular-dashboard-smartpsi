export interface Schedule {
    id: string;
    people_id: string;
    status: string;
    usersId: string;
    date: string;
    start_hour: string;
    end_hour: string;
    created_at: Date;
    updated_at: Date;
}
export interface Peoples {
    id: string;
    typeface: string;
    type_people: boolean;
    name: string;
    document: string;
    razao_social: string;
    fantasy_name: string;
    state_subscription: string;
    municipality_registration: string;
    cellphone: string;
    telephone: string;
    email: string;
    mother_name: string;
    father_name: string;
    rg: string;
    rg_orgao: string;
    rg_data_expedicao: Date;
    sexo: boolean;
    birth_date: Date;
    marital_status: string;
    nationality: string;
    zip_code: string;
    public_place: string;
    number: number;
    complement: string;
    neighborhood: string;
    cyte: string;
    uf: string;
    profession: string;
    masterId: string;
    created_at: Date;
    updated_at: Date;
}

export interface DashboardResponse {
  schedule: Schedule[];
  birthdays: Peoples[];
  cardNumbers: CardNumbersResponse;
}

export interface CardNumbersResponse {
  appointment: number;
  servicesPerformed: number;
  canceledCalls: number;
}
