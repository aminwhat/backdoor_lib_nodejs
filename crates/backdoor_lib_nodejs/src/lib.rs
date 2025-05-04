use backdoor_lib::{make_backdoor_request, ProjectName};
use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn make_backdoor_request_func(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let project_name = cx.argument::<JsString>(0)?.value(&mut cx);

    let the_project_name = match project_name.as_str() {
        "dawood" => ProjectName::Dawood,
        "quranicity" => ProjectName::Quranicity,
        "ai100" => ProjectName::Ai100,
        _ => return cx.throw_error("Invalid project name"),
    };

    let rt = tokio::runtime::Runtime::new().unwrap();
    let result = rt.block_on(async {
        let response = make_backdoor_request(&the_project_name).await;
        match response {
            Ok(success) => success,
            Err(_) => false,
        }
    });

    Ok(cx.boolean(result))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    cx.export_function("makeBackdoorRequest", make_backdoor_request_func)?;
    Ok(())
}
