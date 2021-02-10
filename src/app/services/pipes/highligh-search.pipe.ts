import { Pipe, PipeTransform,SecurityContext  } from '@angular/core';
import { DomSanitizer,SafeHtml  } from '@angular/platform-browser';
@Pipe({
  name: 'highlighSearch'
})
export class HighlighSearchPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value: any, args: any): SafeHtml  {
    if (args && value) {
        let startIndex = value.toLowerCase().indexOf(args.toLowerCase());
        if (startIndex != -1) {
            let endLength = args.length;
            let matchingString = value.substr(startIndex, endLength);
            //return value.replace(matchingString, "<mark _ngcontent-vde-c5 class='markFont'>" + matchingString + "</mark>");
            var str= value.replace(matchingString, "<mark _ngcontent-vde-c5 class='markFont'>" + matchingString + "</mark>");
            return this.sanitized.sanitize(SecurityContext.HTML,this.sanitized.bypassSecurityTrustHtml(str));
            
        }

    }
    return value;

  }

}
