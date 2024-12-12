export async function try_catch(promise){
    try{
        const result = await promise;
        return [result, null];
    }
    catch(err){
        console.error(err);
        return [null, err];
    }
}

export function select(key, switcher, separator){

    // Get value directly if separator is not defined
    if(!separator) return switcher[key] ?? switcher['default'];

    // Find first key in switcher that includes the search-by key if separator is defined
    const found_key = switcher[key] ?? Object.keys(switcher).find(switcher_key =>

        // Only lookup key in switcher_key if it is a string
        typeof switcher_key !== 'string'
        ? switcher_key === key                          // Manage non-string keys by comparing them directly
        : switcher_key.split(separator).includes(key)   // Check if case key is included in switcher_key
    );

    return switcher[found_key ?? 'default'];
}