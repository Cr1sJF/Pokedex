export function decodeObjectProp(object:any, propertyPath:string):string {
	propertyPath = propertyPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	propertyPath = propertyPath.replace(/^\./, '');           // strip a leading dot
	var a = propertyPath.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k:string = a[i];
		if (k in object) {
			object = object[k];
		} else {
			return "";
		}
	}
	return object;
}