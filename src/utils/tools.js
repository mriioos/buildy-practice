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