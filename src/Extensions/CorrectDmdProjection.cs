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

public class CorrectDmdProjection
{
    private Scalar fillValue = new Scalar(0,0,0,255);
    public Scalar FillValue{
        get { return fillValue; }
        set { fillValue = value; }
    }
    public IObservable<IplImage> Process(IObservable<Tuple<IplImage, Tuple<IplImage, IplImage>>> source)
    {
        return source.Select(value => {
            var map1 = value.Item2.Item1;
            var map2 = value.Item2.Item2;
            var src = value.Item1;
            var dest = new IplImage(map1.Size, IplDepth.U8, src.Channels);
            CV.Remap(src, dest, map1, map2, WarpFlags.Linear, fillValue);
            return dest;
        });
    }
}
