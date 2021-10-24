export const parseSort = (sort: string): Record<string, number | string> => {
    const result : Record<string, number | string> = {} ;
    if (sort) {
        const [param, value] = sort.split(":");
        result[param] = value;
    }
    return result;

};

/**
 * Returns mongo query object from selfmade formated queryString example q=name:ego,age-lte:20 will translate to {name:"ego", age:{$lte:20}}
 * @param queries:string selfmade formated string to query 
 */
export const stringToQueryObj = (queries: string): Record<string, unknown>=> {
    if (queries) {
        return queries.split(",").reduce((sum:  Record<string, unknown>, queriPair) => {
            const [keyConstraint, value] = queriPair.split(":");

            const [key, constrain] = keyConstraint.split("-");

            if (value && constrain) {
                const que : Record<string, unknown>= {};

                if (constrain === "regex") {
                    que[`$${constrain}`] = new RegExp(value);
                } else if (constrain ==="in"){
                    const currentValues = sum[key] && (sum[key] as Record<string, unknown>)[`$${constrain}`];
                    que[`$${constrain}`] = currentValues ? [...(currentValues as Array<string>), value] : [value];
                }else{
                    que[`$${constrain}`] = value;
                }
                
                if(!sum[key]){
                    sum[key] = que;
                }else{
                    sum[key] = {...sum[key] as Record<string, unknown>, ...que};
                }
            }else{
                sum[keyConstraint] = value;
            }
            return sum;
        }, {} );

    }

    return {};
};