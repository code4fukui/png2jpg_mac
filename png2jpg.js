const list = await Deno.readDir("./");
for await (const f of list) {
    const fn = f.name;
    if (!(fn.endsWith(".png") || fn.endsWith(".PNG"))) {
        continue;
    }
    console.log(fn);
    const p = Deno.run({ cmd: [
        "sips",
        "--setProperty",
        "format",
        "jpeg",
        fn,
        "--out",
        `${fn.substring(0, fn.length - 3).replace(/\s/g, "_")}jpg`,
    ], stdout: "piped", stderr: "piped" });
    await p.status();
    await Deno.remove(fn);
}
