using Bonsai;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using OpenCV.Net;
using System.Xml.Serialization;


[Combinator]
[Description("")]
[WorkflowElementCategory(ElementCategory.Transform)]

public class GetCalibrationMap
{
    public IObservable<Tuple<IplImage, IplImage>> Process(IObservable<Tuple<IplImage, IplImage>> source)
    {

        return source.Select(value => {
            var outMap1 = new IplImage(value.Item1.Size, IplDepth.S16, 2);
            var outMap2 = new IplImage(value.Item1.Size, IplDepth.S16, 1);
            CV.ConvertMaps(value.Item1, value.Item2, outMap1, outMap2);
            return Tuple.Create(outMap1, outMap2);
        });
    }
}
